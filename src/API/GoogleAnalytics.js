import { GA_TRACKINGID } from '../API/Environment';
import ReactGA from 'react-ga';
ReactGA.initialize(GA_TRACKINGID);

const GAEvenet = () => ReactGA.pageview(window.location.pathname + window.location.search);

export {GAEvenet};