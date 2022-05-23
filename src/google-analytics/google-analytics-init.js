import ReactGA from "react-ga";

const googleAnalyticsActions1 ={};


googleAnalyticsActions1.initGoogleAnalytics = async()=>{
    ReactGA.initialize("UA-215971542-4");
    ReactGA.pageview(window.location.pathname + window.location.search)
}

export {googleAnalyticsActions1}
