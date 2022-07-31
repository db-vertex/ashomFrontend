import { configureStore } from "@reduxjs/toolkit";
import ShareBtnModalReducer from './reducers/ShareBtnModalReducer';
import SubscriptionModalReducer from './reducers/SubscriptionModalReducer';
import userReducer from './reducers/UserdataReducer';
import sharenewsreducer from './reducers/NewsShareReducer';
import forumNewsModalreducer from './reducers/ForumNewsModalReducer';
import headermenureducer from './reducers/HeaderMenuReducer';
import companiesbycountryreducer from './reducers/CompanyByContry';
import forumeditdataredyucer from "./reducers/forumEditData";
import pollEditDataReducer from "./reducers/PollEditDataReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        sharebtnmodal: ShareBtnModalReducer,
        subscriptionmodal: SubscriptionModalReducer,
        sharenewsreducer: sharenewsreducer,
        forumnewsmodal: forumNewsModalreducer,
        headermenureducer: headermenureducer,
        companiesbycountryreducer: companiesbycountryreducer,
        forumeditdata: forumeditdataredyucer,
        polleditdata: pollEditDataReducer,
    }
})

export default store;