import axios from 'axios';
import { getUserToken } from './LocalStore';

 const token = ()=> getUserToken();

const base_url = 'http://localhost:8000/';
let source = axios.CancelToken.source();

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " year ago";
        else
            return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " month ago";
        else
            return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " day ago";
        else {
            if (interval < 8) {
                return Math.floor(interval) + " days ago";
            } else if (interval < 15)
                return "1  week ago";
            else
                return Math.floor(interval / 7) + "  weeks ago";
        }
    }
    
    interval = seconds / 3600;
    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " hour ago";
        else
            return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        if (interval < 2)
            return Math.floor(interval) + " minute ago";
        else
            return Math.floor(interval) + " minutes ago";
    }
    if (interval < 2)
        return ((Math.floor(seconds) < 0) ? 0 : (Math.floor(seconds))) + " second ago";
    else
        return Math.floor(seconds) + " seconds ago";
}


function signupAPI(first_name, last_name, countryCode, email, password, login_type, phone, social_id, profile_pic = "") {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append('first_name', first_name);
        bodyFormData.append('last_name', last_name);
        bodyFormData.append('device_id', 'NoDeviceId');
        bodyFormData.append('country_code', countryCode);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        bodyFormData.append('login_type', login_type);
        bodyFormData.append('mobile', phone);
        bodyFormData.append('app_version', 'Web');
        bodyFormData.append('social_id', social_id);
        bodyFormData.append('profile_pic', profile_pic);

        axios({
                method: "post",
                url: base_url + "api/webservice/user",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data)
            })
            .catch(function(error) {
                resolve(error.response.data)
            })
    })
}


//https://ashom.app/api/webservice/updateuser
// token, first_name, last_name, email, mobile (<--mandatory all), profile_pic (optional) 
function updateuserapi(first_name, last_name, email, country_code, mobile, profile_pic) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("first_name", first_name);
        bodyFormData.append("last_name", last_name);
        bodyFormData.append("email", email);
        bodyFormData.append("mobile", mobile);
        bodyFormData.append("country_code", country_code);
        bodyFormData.append("profile_pic", profile_pic);

        axios({
                method: "post",
                url: base_url + "api/webservice/updateuser/",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}


function verifyOtp(mobile = '', otp = 0) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/verifyotp/" + mobile + '/' + otp,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            })
    })
}

// https://ashom.app/api/webservice/resendotp/{mobile}
function resendOTP(mobile = '') {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/resendotp/" + mobile,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) { resolve(error); })
    })
}

function getUserdata() {
    let var_token = getUserToken();
    var bodyFormData = new FormData();
    bodyFormData.append("token", var_token)
    return new Promise(resolve => {
        axios({
                method: "post",
                url: base_url + "api/webservice/userdata",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data.userdata);
            })
            .catch(function(error) {
                resolve(error);
            });
    })
}

function getUserdataByToken(var_token) {
    var bodyFormData = new FormData();
    bodyFormData.append("token", var_token)
    return new Promise(resolve => {
        axios({
                method: "post",
                url: base_url + "api/webservice/userdata",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}


function getCountries() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/countries",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

function allcompaniesApi() {
    return new Promise(resolve => {
        fetch(base_url + "api/webservice/companies", {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json()) // second step
            .then(data => {
                resolve(data);
            })
            .catch(error => console.error(error))
    })
}



// https://ashom.app/api/webservice/companies/{country_name}

function getCompaniesByCountry(country, page, search, controller) {
    if (page !== "")
        page++;
    if (search === "")
        search = 0;
    if (country === "")
        country = 0;
    return new Promise(resolve => {
        fetch(base_url + "api/webservice/companies/" + country + "/" + search + "/" + page, {
                headers: {
                    'Content-Type': 'application/json'
                },

            }) // first step
            .then(response => response.json()) // second step
            .then(data => {
                resolve(data);
            })
            .catch(error => console.error("Cancelled : " + search))
            // axios({
            //         method: "get",
            //         url: base_url + "api/webservice/companies/" + country + "/" + search + "/" + page,
            //         headers: { "Content-Type": "application/json" },
            //     })
            //     .then(function(response) {
            //         resolve(response.data);
            //     })
            //     .catch(function(error) {

        //     });
    })
}
// https://ashom.app/api/webservice/getyears/{company_id}
function getCompanyYears(CompanyId = 0) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/getyears/" + CompanyId,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/documents/{company_id}/{year}/{period}
function getCompanyDocuments(CompanyId = 0, year, period = '') {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/documents/" + CompanyId + '/' + year + '/' + period,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            }).catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/financialapi
function getFinancialNews(page = 0, country = '', company_name = '') {
    // source.cancel();
    if (country === '' && company_name === '')
        var fetch_url = base_url + "api/webservice/financialapi/" + page;
    else if (country != '' && company_name === '')
        var fetch_url = base_url + "api/webservice/financialapi/" + page + '/' + country;
    else if (country != '' && company_name != '')
        var fetch_url = base_url + "api/webservice/financialapi/" + page + '/' + country + '/' + company_name;
    
    return new Promise(resolve => {
        axios({
                method: "get",
                url: fetch_url,
                cancelToken: source.token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/financialapi2
function getFinancialNews2(page = 0, dataSize = 0, country = '') {
    if (country != '')
        var fetch_url = base_url + "api/webservice/financialapi2/" + page + '/' + dataSize + '/' + country;
    else
        var fetch_url = base_url + "api/webservice/financialapi2/" + page + '/' + dataSize;

    return new Promise(resolve => {
        axios({
                method: "get",
                url: fetch_url,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}


// https://ashom.app/api/webservice/likeorunlike
function getFinancialNewsPost(page, countryname, companyname, search) {
    if (search === 0)
        search = '';
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("page", page);
        bodyFormData.append("countryname", countryname);
        bodyFormData.append("companyname", companyname);
        bodyFormData.append("search", search);

        axios({
                method: "post",
                url: base_url + "api/webservice/financialapi/",
                data: bodyFormData,
                cancelToken: source.token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

function getForums() {
    const token = getUserToken();
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/forum/" + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/likeorunlike
function setLikeUnlikeForum(forum_id) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("forum_id", forum_id);

        axios({
                method: "post",
                url: base_url + "api/webservice/likeorunlike/",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/dislikeorundislike
function setDislikeUnDislikeForum(forum_id) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("forum_id", forum_id);

        axios({
                method: "post",
                url: base_url + "api/webservice/dislikeorundislike",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/shareproject/{forum_id}
function setForumShares(forum_id) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/shareproject/" + forum_id,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/changepassword
// post: token, old_password, new_password, confirm_password
function requestChangePassword(old_password, new_password, confirm_password) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("old_password", old_password);
        bodyFormData.append("new_password", new_password);
        bodyFormData.append("confirm_password", confirm_password);

        axios({
                method: "post",
                url: base_url + "api/webservice/changepassword",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                resolve(error);
            });
    })
}

// https://ashom.app/api/webservice/forgetpassword
// post : email
function requestForgetPassword(email) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        axios({
                method: "post",
                url: base_url + "api/webservice/forgetpassword",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                resolve(error);
            });
    })
}

//https://ashom.app/api/webservice/comments/{forum_id}/{token}
function getForumComments(forum_id) {
    const token = getUserToken();
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/comments/" + forum_id + '/' + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/remainvisits?token=085b68dc10c4a950b8e4c1e068c4180d
function getRemainsVisits(company_id = 0) {
    const token = getUserToken();
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/remainvisits?token=" + token + "&company_id=" + company_id,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/subscription
//POST : token, expire_date (YYYY-MM-DD)  , subscription_type, amount

function requestSubscribe(subscription_type, subscription_amount, expiry_date) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("expire_date", expiry_date);
        bodyFormData.append("subscription_type", subscription_type);
        bodyFormData.append("amount", subscription_amount);

        axios({
                method: "post",
                url: base_url + "api/webservice/subscription",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

//https://ashom.app/api/webservice/opencompany
//POST : token, company_id, is_view

function requestOpenCompanyApi(company_id, is_view = 0) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("company_id", company_id);
        bodyFormData.append("is_view", is_view);

        axios({
                method: "post",
                url: base_url + "api/webservice/opencompany",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

//https://ashom.app/api/webservice/forgetpassword
//POST : email
function requestForgotPassword(email) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);

        axios({
                method: "post",
                url: base_url + "api/webservice/forgetpassword",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://www.ashom.app/api/webservice/contactus
//email, name, subject, message (All Fields Required)
function requestContactUs(email, name, subject, message, mobile) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        bodyFormData.append("name", name);
        bodyFormData.append("subject", subject);
        bodyFormData.append("message", message);
        bodyFormData.append("mobile", mobile);

        axios({
                method: "post",
                url: base_url + "api/webservice/contactus",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

//https://ashom.app/api/webservice/getSingleCompany
function getSingleCompany(CompanyId) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/singlecompany/" + CompanyId,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/privacy_policy
function getPrivacyPolicy() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/privacy_policy",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data.description);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/termsncondition
function getTermsncondition() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/termsnconditions",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data.description);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/aboutus
function getAboutus() {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/aboutus",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/comment
// token, forum_id, comment

function createCommentApi(forum_id, comment) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("forum_id", forum_id);
        bodyFormData.append("comment", comment);
        axios({
                method: "post",
                url: base_url + "api/webservice/comment",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

function updateCommentApi(forum_id, comment, comment_id) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("forum_id", forum_id);
        bodyFormData.append("comment", comment);
        bodyFormData.append("comment_id", comment_id);
        axios({
                method: "post",
                url: base_url + "api/webservice/comment",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/deletecomment/{comment_or_reply_id}
function deleteCommentApi(comment_id) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/deletecomment/" + comment_id,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/forum
//POST : token, content, content_image
function postForumApi(content, content_image) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("content", content);
        bodyFormData.append("content_image", content_image);
        axios({
                method: "post",
                url: base_url + "api/webservice/forum",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}
// https://ashom.app/api/webservice/updateforum/
function updateForumApi(content, content_image, forum_id) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("content", content);
        bodyFormData.append("content_image", content_image);
        bodyFormData.append("forum_id", forum_id);
        axios({
                method: "post",
                url: base_url + "api/webservice/updateforum",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}


// https://ashom.app/api/webservice/postpoll
// token, title, option1, option2, option3, validity(: All Fields are required and validity must be in numbers eg : 1day : 1)
function postpollApi(title, option1, option2, option3, validity) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("title", title);
        bodyFormData.append("option1", option1);
        bodyFormData.append("option2", option2);
        bodyFormData.append("option3", option3);
        bodyFormData.append("validity", validity);
        axios({
                method: "post",
                url: base_url + "api/webservice/postpoll",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}


function getLinkedinAccessToken(code, redirect_uri) {
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("code", code);
        bodyFormData.append("redirect", redirect_uri);
        axios({
                method: "post",
                url: base_url + "api/webservice/linkedInProfile",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {

            });
    })
}


function getLikedUserName(accesstoken) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: "https://api.linkedin.com/v2/me",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accesstoken },
            })
            .then(function(response) {
                let metadata = response.data;
                var userdata = { "firstName": metadata.firstName.localized.en_US, "lastName": metadata.lastName.localized.en_US }
                resolve(userdata);
            })
            .catch(function(error) {

            });
    })
}

function getLikedUserEmail(accesstoken) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + accesstoken },
            })
            .then(function(response) {
                let metadata = response.data.elements[0]["handle~"].emailAddress;
                var userdata = { "firstName": metadata.firstName.localized.en_US, "lastName": metadata.lastName.localized.en_US }
                resolve(userdata);
            })
            .catch(function(error) {

            });
    })
}

// https://ashom.app/api/webservice/sendvote
//Post : token, poll_id, selected_option  (Selected Option Must be only 1, 2, 3) All Fields are required
function votePollApi(poll_id, selected_option) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("poll_id", poll_id);
        bodyFormData.append("selected_option", selected_option);
        axios({
                method: "post",
                url: base_url + "api/webservice/sendvote",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}
//https://ashom.app/api/webservice/reply
//POST : token, comment_id, comment
function makeReplayAPI(comment_id, comment) {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("comment_id", comment_id);
        bodyFormData.append("comment", comment);
        axios({
                method: "post",
                url: base_url + "api/webservice/reply",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

//GET : https://ashom.app/api/webservice/commentreplies/{comment_or_reply_id}
function getCommentReplies(comment_id) {
    const token = getUserToken();
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/commentreplies/" + comment_id + "/" + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/selectedcompanies/104146150362620465664
function getSelectedCompanies() {
    const token = getUserToken();
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/selectedcompanies/" + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/searches/l65pjq_c9Q
function getSearchesAPI(Global = false) {
    const token = getUserToken();
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/searches" + ((!Global) ? ("?token=" + token) : ""),
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/usernotifications/{token}
function getNotficationsAPi() {
    const token = getUserToken();
    return new Promise(resolve => {
        if (token === undefined)
            resolve(0);
        axios({
                method: "get",
                url: base_url + "api/webservice/usernotifications/" + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}


//https://ashom.app/api/webservice/searchinsert
//POST : token, searchstr
function insertSearchAPI(searchstr = "") {
    const token = getUserToken();
    return new Promise(resolve => {
        var bodyFormData = new FormData();
        bodyFormData.append("token", token);
        bodyFormData.append("searchstr", searchstr);
        axios({
                method: "post",
                url: base_url + "api/webservice/searchinsert",
                data: bodyFormData,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/deleteforum/{forum_id}
function deleteForumAPI(forum_id) {
    const token = getUserToken();
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/deleteforum/" + forum_id + "/" + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=6b2a8a68f457d0d252f8
function getUSD2INR(USD = 0) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: "https://www.ashom.app/api/webservice/currencyprice/INR",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                let currentUsdPrixe = parseFloat(response.data.price);
                let amount = currentUsdPrixe * parseFloat(USD);
                resolve(amount);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

function getINR2USD(INR = 0) {
    return new Promise(resolve => {
        axios({
                method: "get",
                url: "https://www.ashom.app/api/webservice/currencyprice/INR",
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                let currentUsdPrixe = parseFloat(response.data.price);
                let amount = parseFloat(INR) / currentUsdPrixe;
                resolve(amount);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://ashom.app/api/webservice/updateDeviceToken
//POST :  token, device_token
function updateDeviceToken(device_token = "") {
    const token = getUserToken();
    if (token !== undefined)
        return new Promise(resolve => {
            var bodyFormData = new FormData();
            bodyFormData.append("token", token);
            bodyFormData.append("device_token", device_token);
            axios({
                    method: "post",
                    url: base_url + "api/webservice/updateDeviceToken",
                    data: bodyFormData,
                    headers: { "Content-Type": "application/json" },
                })
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    resolve(error.response.data);
                });
        })
}

// https://ashom.app/api/webservice/deletedevietoken/{device_token}
function deleteDeviceToken() {
    let device_token = window.localStorage.getItem('device_token');
    window.localStorage.removeItem('device_token');
    return new Promise(resolve => {
        axios({
                method: "get",
                url: base_url + "api/webservice/deletedevietoken/" + device_token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://testnet.ashom.app/api/webservice/unreadnotification/{token}
function notificationCounterAPi() {
    const token = getUserToken();
    console.log(token);
    return new Promise(resolve => {
        console.log("mytoken", token);
        if(token==undefined){
            console.log(token);     
            resolve(0);
        }
        else        
        axios({
                method: "get",
                url: base_url + "api/webservice/unreadnotification/" + token,
                headers: { "Content-Type": "application/json" },
            })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                resolve(error.response.data);
            });
    })
}

// https://testnet.ashom.app/api/webservice/recordevent
//post: token, event
function userEventAPI(event = "") {
    const token = getUserToken();
    if (token !== undefined)
        return new Promise(resolve => {
            var bodyFormData = new FormData();
            bodyFormData.append("token", token);
            bodyFormData.append("event", event);
            axios({
                    method: "post",
                    url: base_url + "api/webservice/recordevent",
                    data: bodyFormData,
                    headers: { "Content-Type": "application/json" },
                })
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    resolve(error.response.data);
                });
        })
}


//https://ashom.app/api/webservice/comment
//POST : token, forum_id, comment




export {
    base_url,
    getLinkedinAccessToken,
    getLikedUserName,
    getLikedUserEmail,
    timeSince,
    signupAPI,
    updateuserapi,
    verifyOtp,
    resendOTP,
    getUserdata,
    getCountries,
    allcompaniesApi,
    getCompaniesByCountry,
    getCompanyYears,
    getCompanyDocuments,
    getFinancialNews,
    getFinancialNews2,
    getFinancialNewsPost,
    getForums,
    deleteForumAPI,
    setLikeUnlikeForum,
    setDislikeUnDislikeForum,
    setForumShares,
    postForumApi,
    updateForumApi,
    requestChangePassword,
    getForumComments,
    getRemainsVisits,
    requestSubscribe,
    requestOpenCompanyApi,
    requestForgotPassword,
    getUserdataByToken,
    requestContactUs,
    getSingleCompany,
    getPrivacyPolicy,
    getTermsncondition,
    getAboutus,
    createCommentApi,
    updateCommentApi,
    deleteCommentApi,
    getCommentReplies,
    makeReplayAPI,
    postpollApi,
    votePollApi,
    getSelectedCompanies,
    getSearchesAPI,
    insertSearchAPI,
    getUSD2INR,
    getINR2USD,
    getNotficationsAPi,
    notificationCounterAPi,
    updateDeviceToken,
    deleteDeviceToken,
    userEventAPI
};