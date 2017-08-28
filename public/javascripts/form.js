$(document).ready(() => {

    window.app = {
        clickableRows: $('.click-row'),
        submitButton: $('#btn-submit'),
        selectedCounter: $('#num-participants'),
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
            const list = this.getCheckedList();
            if (list.length !== 0) {
                $('#idList').val(list);
                $('#dateTime').val();
                $('#venue').val();
                $('#submitForm').submit();
            }
            else {
                alert("Please select at least 1 participant.");
            }

        },
        init: function () {
            const _this = this;
            Materialize.updateTextFields();
            this.clickableRows.data('checked', false);
            this.clickableRows.on('click', function () {
                if ($(this).data('checked') === false) {
                    _this.selectedCounter.html( +(_this.selectedCounter.html()) + 1 );
                    $(this).data('checked', true);
                    $(this).addClass("bgsmoke");
                    $(this).children('td').first().children('.myCheckbox').first().prop("checked", "true");
                }
                else {
                    _this.selectedCounter.html( +(_this.selectedCounter.html()) -1 );
                    $(this).data('checked', false);
                    $(this).removeClass("bgsmoke");
                    $(this).addClass("bgwhite");
                    $(this).children('td').first().children('.myCheckbox').first().prop("checked", null);
                }
            });
            $('#btn-submit').on('click',function () {
                _this.submitForm();
            });
        }
    };

    window.app.init();

});
