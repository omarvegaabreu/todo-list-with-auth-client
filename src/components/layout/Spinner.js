import { Message, Icon } from "semantic-ui-react";

const LoadingSpinner = () => (
  <div>
    <Message icon>
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>Loading</Message.Header>
      </Message.Content>
    </Message>
  </div>
);

export default LoadingSpinner;
