Rows = new Mongo.Collection("tests");

if (Meteor.isClient) {
    Meteor.subscribe("tests");

    var removeUnderscores = function(name) {
        return name === null ? "" : Spacebars.SafeString(name.replace(/_/g, " "))
    }

    var formatDate = function(fulldate) {
        try {
            var date = new Date(fulldate);

            var year = date.getFullYear();
            var month = parseInt(("0" + date.getMonth()).slice(-2)) + 1;
            var day = ("0" + date.getDate()).slice(-2);
            var time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);

            return Spacebars.SafeString(year + "-" + month + "-" + day + " " + time);
        }
        catch(err) {
            console.log(err);

            return ""
        }
    }

    Template.reactive_table.helpers({
        tableSettings: function() {
            return {
                collection: Rows,
                rowsPerPage: 10,
                showFilter: true,
                fields: [
                    {key: 'issue_type', label: "Type"},
                    {key: 'city', label: "City", fn: removeUnderscores },
                    {key: 'ticket_status', label: "Status"},
                    {key: 'ticket_created_date_time', label: "Created Date", fn: formatDate},
                    {key: 'ticket_closed_date_time', label: "Closed Date", fn: formatDate}
                ]
            };
        },

        rows: function() {
            return Rows.find({})
        }
    });

}

if (Meteor.isServer) {
    Meteor.publish("row", function () {
        return Tasks.find();
    });

    Meteor.startup(function () {
      // code to run on server at startup
    });

  Meteor.methods({
  });
}
