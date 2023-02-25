odoo.define('web_tree_footer_text.ListRendererFooterText', function (require) {
    "use strict";
    
    var config = require('web.config');
    var field_utils = require('web.field_utils');
    var ListRenderer = require('web.ListRenderer');
    
    
    ListRenderer.include({
        _computeColumnAggregates: function (data, column) {
            this._super.apply(this, arguments);
            var attrs = column.attrs;
            var func_text = attrs.agg_text && 'agg_text';
            var agg_text = {agg_text: ''};
            if (func_text) {
                agg_text = {agg_text: attrs[func_text]};
            }

            if (_.has(column, 'aggregate')) {
                _.extend(column.aggregate, agg_text)
            }
            else {
                column.aggregate = agg_text;
            }
        },
        _renderAggregateCells: function (aggregateValues) {
            var self = this;

            return _.map(this.columns, function (column) {
                var $cell = $('<td>');
                if (config.isDebug()) {
                    $cell.addClass(column.attrs.name);
                }
                if (column.attrs.editOnly) {
                    $cell.addClass('oe_edit_only');
                }
                if (column.attrs.readOnly) {
                    $cell.addClass('oe_read_only');
                }
                if (column.attrs.name in aggregateValues) {
                    var field = self.state.fields[column.attrs.name];
                    var value = aggregateValues[column.attrs.name].value;
                    var help = aggregateValues[column.attrs.name].help;
                    var agg_text = aggregateValues[column.attrs.name].agg_text;
                    var formatFunc = field_utils.format[column.attrs.widget];
                    if (!formatFunc) {
                        formatFunc = field_utils.format[field.type];
                    }
                    var formattedValue = formatFunc(value, field, {
                        escape: true,
                        digits: column.attrs.digits ? JSON.parse(column.attrs.digits) : undefined,
                    });
                    $cell.addClass('o_list_number').attr('title', help).html(agg_text.concat(' ', formattedValue));
                }
                return $cell;
            });
        },
    });
});