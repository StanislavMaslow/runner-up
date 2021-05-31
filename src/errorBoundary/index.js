import React from 'react';
import { Text } from 'react-native';
import Center from '../commons/Center';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    // TODO handle ui on error
    console.log('---error happened-------', error);

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.log('---error happened-------', error, errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <Center>
          <Text>
            Something went wrong. App crashed please send details to: link
          </Text>
        </Center>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
