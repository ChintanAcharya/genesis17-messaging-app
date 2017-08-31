$(document).ready(() => {

    window.app = {
        venueInput: $('#venueInput'),
        timepicker: $('.timepicker'),
        clickableRows: $('.click-row'),
        submitButton: $('#btn-submit1'),
        formSubmitButton: $('#btn-submit2'),
        selectedCounter: $('#num-participants'),
        modal: $('#modal'),
        datePicker: $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false,
            container: 'body'
        }).pickadate('picker'),
        getCheckedList: function () {
            const idarr = [];
            this.clickableRows.each(function () {
                const row = $(this);
                if (row.data('checked')) {
                    idarr.push(row.data('id'));
                }
            });
            return idarr;
        },
        submitForm: function () {
            const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const list = this.getCheckedList();
            const datepicker = this.datePicker.get('select');
            if (list.length !== 0) {
                $('#idList').val(list);
                $('#dateTime').val(datepicker.date + ' ' + monthArr[datepicker.month] + ' ' + this.timepicker.val());
                $('#venue').val(this.venueInput.val());
                //console.log(datepicker.date + ' ' + monthArr[datepicker.month] + ' ' + this.timepicker.val() + ' '+this.venueInput.val()+' '+);
                $('#submitForm').submit();
            }
            else {
                alert("Please select at least 1 participant.");
            }
        },
        openModal: function () {
            const list = this.getCheckedList();
            console.log(list);
            if (list.length !== 0) {
                this.modal.modal('open');
            }
            else {
                alert("Please select at least 1 participant.");
            }
        },
        init: function () {
            const _this = this;
            Materialize.updateTextFields();
            this.modal.modal();
            this.clickableRows.data('checked', false);
            this.clickableRows.on('click', function () {
                if ($(this).data('checked') === false) {
                    _this.selectedCounter.html(+(_this.selectedCounter.html()) + 1);
                    $(this).data('checked', true);
                    $(this).addClass("bgsmoke");
                    $(this).children('td').first().children('.myCheckbox').first().prop("checked", "true");
                }
                else {
                    _this.selectedCounter.html(+(_this.selectedCounter.html()) - 1);
                    $(this).data('checked', false);
                    $(this).removeClass("bgsmoke");
                    $(this).addClass("bgwhite");
                    $(this).children('td').first().children('.myCheckbox').first().prop("checked", null);
                }
            });
            this.submitButton.on('click', function () {
                _this.openModal();
            });

            this.formSubmitButton.on('click', function () {
                _this.submitForm();
            });
            this.timepicker.pickatime({
                default: 'now',
                fromnow: 0,
                twelvehour: true,
                donetext: 'OK',
                cleartext: 'Clear',
                canceltext: 'Cancel',
                autoclose: true,
                ampmclickable: true,
                container: 'body',
                onStart: function () {
                    $('.timepicker').appendTo('body');
                }
            });
        }
    };

    window.app.init();

});
