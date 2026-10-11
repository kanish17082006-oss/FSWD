
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error);
    console.error("Error details:", info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong!</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function Child() {
  const [crash, setCrash] = React.useState(false);

  if (crash) {
    throw new Error("Button clicked error!");
  }

  return (
    <button onClick={() => setCrash(true)}>
      Throw Error
    </button>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Child />
    </ErrorBoundary>
  );
}
