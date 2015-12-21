/**
 * Created by RadNowacki on 20.12.15.
 */
describe ('loginSrvTests', function () {
    var logService;
    var mockBackend;
    var $scope;

    var mockForm = {
        email : 'przykladowy@email.com',
        password : 'aaa2Eff'
    };

    beforeEach(module('app'));


    beforeEach(inject(['loginService', function($service) {
        logService = $service;
    }]));

    beforeEach(inject(function($injector) {
        mockBackend = $injector.get('$httpBackend');
        $scope = $injector.get('$rootScope').$new();
    }));

    afterEach(function() {
        mockBackend.verifyNoOutstandingExpectation();
        mockBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
        expect(logService).toBeDefined();
    });

    it('should return message for 401', function () {
        var message = logService.getMessage(401);
        expect(message).toBe('Niepoprawny login lub hasło');
    });

    it('should return message for unknown error', function () {
        var message = logService.getMessage(412);
        expect(message).toBe('Wystąpił nieznany błąd');
    });

    it('should check if proper error status is returned', function (){
        mockBackend.when('POST', '//api.test/auth?email=' + mockForm.email + '&password=' + mockForm.password).respond(401, 'fail');
        logService.sendForm(mockForm);
        mockBackend.flush();
    });
});