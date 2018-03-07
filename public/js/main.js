$(function () {
    $("[data-add-hours]").click(function () {
        var me = $(this);//a tag
        var parent = me.parents("li");

        $.ajax({
            url: "/employees/" + parent.data("employee-id"),
            method: "GET",
            success: function (data) {
                $.ajax({
                    url: "/hbs/hours.hbs",
                    success: function (templateHtml) {
                        parent.find(".hours").remove();
                        var template = Handlebars.compile(templateHtml);
                        parent.append(template(data));
                    }
                })
            }
        });
    });

    $("body").on("change", "[data-hours]", function () {
        var me = $(this);
        var parent = me.parents("li");
        var id = parent.data("employee-id");

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