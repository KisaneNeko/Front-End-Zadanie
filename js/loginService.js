/**
 * Created by RadNowacki on 19.12.15.
 */
angular.module('app').service(
    "loginService", function( $http, $q ) {
        return ({
            sendForm: sendForm,
            handleError: handleError,
            getMessage : getMessage
        });

        /**
         * Funkcja wysyłająca AJAX z danymi logowania.
         * @param form      - obiekt zawierający wartości pól formularza.
         * @returns {*}     - komunikat informujący o poprawnym logowaniu, lub blędzie.
         */
        function sendForm(form) {
            var url = "//api.test/auth";
            var request = $http({
                method: "post",
                url: url,
                params: {
                    email: form.email,
                    password: form.password
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        /**
         * Obsługa błędów żadania
         *
         * @param response
         * @returns {{status: string, message: *}}
         */
        function handleError (response) {
            return {status : 'fail', message : getMessage(response.status)};
        }

        /**
         * Obsługa sukcesu żądania
         *
         * @param response
         * @returns {{status: string, message: *}}
         */
        function handleSuccess(response) {
            console.log(response);
            return {status : 'success', message : getMessage(response.status) };
        }

        /**
         * Funkcja pobiera ze słownika treść wiadomości w zależności od otrzymanego kodu HTTP.
         *
         * @param code
         * @returns {*}
         */
        function getMessage(code) {
            var dictionary = {
                201 : 'Logowanie poprawne',
                401 : 'Niepoprawny login lub hasło',
                400 : 'Niepoprawne dane',
                500 : 'Błąd usługi',
                404 : 'Nie znaleziono strony'
            };

            return ( dictionary[code] ) ? dictionary[code] :'Wystąpił nieznany błąd';
        }
});