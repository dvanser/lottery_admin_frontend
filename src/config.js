let config = {
    baseUrl: 'https://api.polslv.micron.lv', //MEMO: michael: prod
    // baseUrl: 'http://127.0.0.1:5000', //MEMO: michael: local
    accessTokenName: 'access_token',
    userRoles: {
        'guest': 0,
        'user': 1,
        'admin': 2
    },
    supportedLangs: ['lv', 'ru'],
    codesRequiredForPrize: {
        'small':  25,
        'medium': 30,
        'big':  50
    },
    cheques: []
};

export default Object.freeze(Object.assign({}, config));
