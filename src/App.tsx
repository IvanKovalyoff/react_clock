import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type ClockProps = {
  name: string;
};

type ClockState = {
  time: Date;
};

class Clock extends React.Component<ClockProps, ClockState> {
  private timeId?: number;

  state: ClockState = {
    time: new Date(),
  };

  componentDidMount() {
    this.timeId = window.setInterval(() => {
      const newTime = new Date();

      const hours = String(newTime.getUTCHours()).padStart(2, '0');
      const minutes = String(newTime.getUTCMinutes()).padStart(2, '0');
      const seconds = String(newTime.getUTCSeconds()).padStart(2, '0');
      const formatted = `${hours}:${minutes}:${seconds}`;

      console.log(formatted);

      this.setState({ time: newTime });
    }, 1000);
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (prevProps.name !== this.props.name) {
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  componentWillUnmount() {
    if (this.timeId) {
      window.clearInterval(this.timeId);
    }
  }

  render(): React.ReactNode {
    const { time } = this.state;
    const { name } = this.props;

    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const formatted = `${hours}:${minutes}:${seconds}`;

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong>
        {'time is'}
        <span className="Clock__time">{formatted}</span>
      </div>
    );
  }
}

type AppState = {
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<{}, AppState> {
  private nameInterval?: number;

  state: AppState = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  componentDidMount() {
    document.addEventListener('click', () => {
      this.setState({ hasClock: true });
    });

    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      this.setState({ hasClock: false });
    });

    this.nameInterval = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3300);
  }

  componentWillUnmount() {
    if (this.nameInterval) {
      window.clearInterval(this.nameInterval);
    }
  }

  render(): React.ReactNode {
    const { hasClock, clockName } = this.state;

    return (
      <div>
        <h1>React clock</h1>
        {hasClock && <Clock name={clockName} />}
      </div>
    );
  }
}
