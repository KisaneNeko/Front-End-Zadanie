/**
 * Created by RadNowacki on 20.12.15.
 */
describe("loginCtrlTests", function(){

    var loginController;
    var logService;
    var q;
    var $scope;
    var deferred;

    var mockForm = {
        email : 'przykladowy@email.com',
        password : 'aaa2Eff'
    };

    var mockResponse = {};

    beforeEach(module("app"));

    beforeEach(inject(['loginService', function($service) {
        logService = $service;
    }]));


    beforeEach(inject(function($controller, $q, _$rootScope_) {
        $scope = _$rootScope_.$new();
        deferred = $q.defer();

        loginController = $controller('loginController', {$scope: $scope});
        q = $q;
    }));

    it('should be defined', function () {
        expect(loginController).toBeDefined();
    });

    it('should pass form data to services sendForm function', function() {
        spyOn(logService, 'sendForm').and.returnValue(deferred.promise);

        loginController.form = mockForm;
        loginController.sendForm();

        expect(logService.sendForm).toHaveBeenCalled();
        expect(logService.sendForm).toHaveBeenCalledWith(mockForm);
    });

    // SUCCESS
    it('should change variable values after request succeed', function () {
        mockResponse = {status : 'success', message : 'OK!'};
        spyOn(logService, 'sendForm').and.returnValue(deferred.promise);

        loginController.form = mockForm;
        loginController.sendForm();

        deferred.resolve(mockResponse);
        $scope.$digest();

        // wartości zmiennych po otrzymanym sukcesie żądania
        // flaga informująca o wystąpieniu błędu
        expect(loginController.respErr).toBe(false);
        // wiadomość o sukcesie
        expect(loginController.respMessage).toBe('OK!');
        // flaga informująca o wysłaniu formularza
        expect(loginController.formSent).toBe(true);
    });

    // FAIL
    it('should change variable values after request fails', function () {
        mockResponse = {status : 'fail', message : 'Error!'};

        spyOn(logService, 'sendForm').and.returnValue(deferred.promise);

        loginController.form = mockForm;
        loginController.sendForm();

        deferred.resolve(mockResponse);
        $scope.$digest();

        // wartości zmiennych po otrzymanym sukcesie żądania
        // flaga informująca o wystąpieniu błędu
        expect(loginController.respErr).toBe(true);
        // wiadomość o błędzie
        expect(loginController.respMessage).toBe('Error!');
        // flaga informująca o wysłaniu formularza
        expect(loginController.formSent).toBe(true);
    });
});