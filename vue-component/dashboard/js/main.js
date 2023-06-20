(function (context, definition) {
	'use strict';
	definition();
})(this, function () {
    Vue.http.interceptors.push((request, next) => {
        var ignore = request.url.includes(URL_REFRESH_TOKEN) ||
        request.url.includes(URL_SIGN_IN);
        if (ignore) {
            next(request);
        } else {
            addTokenToHeader(request, getToken());
            next(request);
        }
        next((response) => {
            if (response.status === 200 && ignore) {
                if (response.body.token_type != null && response.body.token_type.trim() != '') {
                    var token = `${response.body.token_type} ${response.body.access_token}`;
                    var refreshToken = response.body.refresh_token;
                    saveToken(token);
                    saveRefreshToken(refreshToken);
                }
            }
            if (response.status === 401) {
                handle401Error(request, next)
            }
        })
    });
})