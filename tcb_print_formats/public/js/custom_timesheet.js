
frappe.ui.form.on("Timesheet", {
	setup: function (frm) {
		// Example: Add a custom field dynamically
		// frappe.require("/assets/tcb_print_formats/js/timer.js");
		// frappe.require("/assets/erpnext/js/projects/timer.js", function() {
            // Load your custom timer file
            frappe.require("/assets/tcb_print_formats/js/custom_timer.js", function() {
                console.log("Custom timer file loaded successfully");
            });
        // });

		frm.ignore_doctypes_on_cancel_all = ["Sales Invoice"];

		frm.fields_dict.employee.get_query = function () {
			return {
				filters: {
					status: "Active",
				},
			};
		};

		frm.fields_dict["time_logs"].grid.get_field("task").get_query = function (frm, cdt, cdn) {
			var child = locals[cdt][cdn];
			return {
				filters: {
					project: child.project,
					status: ["!=", "Cancelled"],
				},
			};
		};

		frm.fields_dict["time_logs"].grid.get_field("project").get_query = function () {
			return {
				filters: {
					company: frm.doc.company,
				},
			};
		};
	}
}
)

