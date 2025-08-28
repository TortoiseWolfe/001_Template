import { render, screen, fireEvent } from '@testing-library/react';
import ScheduleButton from '../ScheduleButton';
import * as analytics from '../../utils/analytics';

// Mock the analytics module
vi.mock('../../utils/analytics', () => ({
  trackScheduleClick: vi.fn(),
}));

describe('ScheduleButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the floating button variant', () => {
    render(
      <ScheduleButton
        variant="floating"
        calendlyUrl="https://calendly.com/test/meeting"
      />
    );

    const button = screen.getByRole('button', {
      name: /schedule an interview/i,
    });
    expect(button).toBeInTheDocument();
    // CSS modules add hash to class names, so check for partial match
    expect(button.className).toMatch(/floating/);
  });

  it('renders the header button variant with text', () => {
    render(
      <ScheduleButton
        variant="header"
        calendlyUrl="https://calendly.com/test/meeting"
      />
    );

    const button = screen.getByRole('button', {
      name: /schedule an interview/i,
    });
    expect(button).toBeInTheDocument();
    expect(button.className).toMatch(/header/);
    expect(screen.getByText('Schedule Interview')).toBeInTheDocument();
  });

  it('renders the inline button variant with text', () => {
    render(
      <ScheduleButton
        variant="inline"
        calendlyUrl="https://calendly.com/test/meeting"
      />
    );

    const button = screen.getByRole('button', {
      name: /schedule an interview/i,
    });
    expect(button).toBeInTheDocument();
    expect(button.className).toMatch(/inline/);
    expect(screen.getByText('Schedule Interview')).toBeInTheDocument();
  });

  it('tracks analytics event on click', () => {
    const trackScheduleClickSpy = vi.spyOn(analytics, 'trackScheduleClick');
    const windowOpenSpy = vi
      .spyOn(window, 'open')
      .mockImplementation(() => null);

    render(
      <ScheduleButton
        variant="floating"
        calendlyUrl="https://calendly.com/test/meeting"
      />
    );
    const button = screen.getByRole('button', {
      name: /schedule an interview/i,
    });

    fireEvent.click(button);

    expect(trackScheduleClickSpy).toHaveBeenCalledWith('floating');

    windowOpenSpy.mockRestore();
  });

  it('opens Calendly URL in new tab on click', () => {
    const windowOpenSpy = vi
      .spyOn(window, 'open')
      .mockImplementation(() => null);
    const calendlyUrl = 'https://calendly.com/test-user/meeting';

    render(<ScheduleButton calendlyUrl={calendlyUrl} variant="inline" />);
    const button = screen.getByRole('button', {
      name: /schedule an interview/i,
    });

    fireEvent.click(button);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      calendlyUrl,
      '_blank',
      'noopener,noreferrer'
    );

    windowOpenSpy.mockRestore();
  });

  it('uses Google Calendar URL when provided without Calendly', () => {
    const windowOpenSpy = vi
      .spyOn(window, 'open')
      .mockImplementation(() => null);
    const googleCalendarUrl =
      'https://calendar.google.com/calendar/appointments';

    render(
      <ScheduleButton googleCalendarUrl={googleCalendarUrl} variant="header" />
    );
    const button = screen.getByRole('button', {
      name: /schedule an interview/i,
    });

    fireEvent.click(button);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      googleCalendarUrl,
      '_blank',
      'noopener,noreferrer'
    );

    windowOpenSpy.mockRestore();
  });

  it('does not render when no URL provided', () => {
    const { container } = render(<ScheduleButton variant="inline" />);
    expect(container.firstChild).toBeNull();
  });

  it('shows text on hover for floating variant', () => {
    render(
      <ScheduleButton
        variant="floating"
        calendlyUrl="https://calendly.com/test/meeting"
      />
    );
    screen.getByRole('button', {
      name: /schedule an interview/i,
    });

    // Text is always visible for floating variant (design change)
    expect(screen.getByText('Book Interview Now!')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ScheduleButton
        variant="inline"
        className="custom-class"
        calendlyUrl="https://calendly.com/test/meeting"
      />
    );

    const button = screen.getByRole('button', {
      name: /schedule an interview/i,
    });
    expect(button.className).toMatch(/custom-class/);
  });
});
