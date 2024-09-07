import { useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    const params = useParams();
    const navigate = useNavigate();

    return <Component {...props} params={params} navigate={navigate} />;
  }

  return ComponentWithRouterProp;
};

export default withRouter;
