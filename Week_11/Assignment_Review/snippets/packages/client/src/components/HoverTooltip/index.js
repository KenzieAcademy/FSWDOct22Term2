import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";

const index = ({ placement, delay, message, children }) => {
  const renderTooltip = (props) => <Tooltip {...props}>{message}</Tooltip>;

  return (
    <OverlayTrigger placement={placement} delay={delay} overlay={renderTooltip}>
      {children}
    </OverlayTrigger>
  );
};

export default index;
