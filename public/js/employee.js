$(document).ready(function () {
    var id = $("[data-employee-id]").val();
    $("[data-hours]").change(function () {
        var me = $(this);
        var day = me.attr("name");
        $.ajax({
            url: "/employees/" + id + "/add-hours",
            method: "POST",
            data: {
                day: day,
                hours: me.val()
            },
            success: function (data) {
                if (data.status === "error") {
                    alert("There was an error");
                } else if (data.status === "success") {
                    //do something on success
                }
            },
            error: function () {
                alert("There was an error!");
            }
        });
    });
});