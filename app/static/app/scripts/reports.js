var filterKeys = {}
function loadDashboards(token) {
    yellowfin.loadDash({
        dashUUID: 'e7409ff2-f846-44e1-a603-b78ec51b20b9',
        elementId: 'sales_dashboard',
        showFilters: 'true',
        showSeries: 'false',
        token: token,
        fitTableWidth: 'true'
    });
    yellowfin.loadReport({
        dashUUID: '1e68d9cc-fa5a-44e2-816d-782aa40ceeae',
        elementId: 'campaign_dashboard',
        showFilters: 'true',
        showSeries: 'false',
        token: token,
        fitTableWidth: 'true'
    });
    yellowfin.dash.loadDashFilters('1e68d9cc-fa5a-44e2-816d-782aa40ceeae', filterCallback);
}
function reloadDash() {
    filterValues = {}
    for (var filterKey in filterKeys) {
        selected = []
        for (var opts of document.getElementById(filterKey).selectedOptions) {
            selected.push(opts.value)
        }
        if (selected.length > 0) { 
            filterValues[filterKeys[filterKey]] = selected;
        }
    }
    yellowfin.loadDash({
        dashUUID: '1e68d9cc-fa5a-44e2-816d-782aa40ceeae',
        elementId: 'campaign_dashboard',
        fitTableWidth: 'true',
        token: '{{ token }}',
        filters: filterValues
    });
}
function filterCallback(filters) {
    if (filters == undefined) return;
    //Populate filter drop down menus with cached values
    for (var i = 0; i < filters.length; i++) {
        if (filters[i].type == "FILTER") { 
            if (filters[i].description == "Region") {
                for (var value of filters[i].listValues) {
                    var o = new Option(value.value, value.value);
                    $("#region-filter").append(o);
                }
                filterKeys["region-filter"]=filters[i].key
            }
            if (filters[i].description == "Company") {
                for (var value of filters[i].listValues) {
                    var o = new Option(value.value, value.value);
                    $("#company-filter").append(o);
                }
                filterKeys["company-filter"]=filters[i].key
            }
            if (filters[i].description == "Campaign") {
                for (var value of filters[i].listValues) {
                    var o = new Option(value.value, value.value);
                    $("#campaign-filter").append(o);
                }
                filterKeys["campaign-filter"]=filters[i].key
            }
        }
    }
    $('#company-filter').multiselect({
        buttonWidth: '200px',
        includeSelectAllOption: true,
        nonSelectedText: 'Select a Company'
    });
    $('#region-filter').multiselect({
        buttonWidth: '200px',
        includeSelectAllOption: true,
        nonSelectedText: 'Select a Region'
    });
    $('#campaign-filter').multiselect({
        buttonWidth: '200px',
        includeSelectAllOption: true,
        nonSelectedText: 'Select a Campaign'
    });
}
$("#sales_select").click(function () {
    $("#sales_div").slideToggle();
    $("#campaign_div").slideToggle();
});

$("#campaign_select").click(function () {
    $("#sales_div").slideToggle();
    $("#campaign_div").slideToggle();
});




