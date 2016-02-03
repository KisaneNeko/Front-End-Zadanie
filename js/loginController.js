/**
 * Created by RadNowacki on 19.12.15.
 */

(function(){
    var app = angular.module('app', ['ngMessages']);
    app.controller('loginController', function(loginService){
        var self = this;

        this.formSent = false;
        this.respErr = true;
        this.respMessage = '';

        /**
         * Obiekt zawierający pola formularza.
         */
        this.form = {
            email : null,
            password : null
        };

        /**
         * Funkcja wywoływana przy przesłaniu formularza.
         *
         * @param invalid flaga informująca o niepoprawności formularza
         */
        this.sendForm = function (invalid) {
            if(invalid){
                // zatrzymanie próby przesłania niepoprawnie wypełnionego formularza
                return;
            }
            loginService.sendForm(self.form).then(function(resp){
                // Ustaw flagę odpowiedzialną za pokazanie informacji o błędzie jeśli taki wystąpił
                self.respErr = resp.status === 'fail';
                self.respMessage = resp.message;
                self.formSent = true;
            });
        };
    });
})();


