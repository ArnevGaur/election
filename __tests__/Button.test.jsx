import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../src/components/ui/Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies the correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveStyle({ background: 'var(--color-accent)' });

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText('Ghost')).toHaveStyle({ background: 'transparent' });
  });

  it('renders with an icon if provided', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;
    render(<Button icon={MockIcon}>With Icon</Button>);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});
