var filterKeys = {}
function loadDashboards(token) {
    yellowfin.loadReport({
        reportUUID: '4a19dba6-30f6-4832-a341-2ee730c6956f',
        elementId: 'dial1',
        showFilters: 'true',
        showSeries: 'false',
        height: '200',
        token: token,
        fitTableWidth: 'true'
    });
    yellowfin.loadReport({
        reportUUID: 'b84d6463-a1dc-471d-9df0-103815bab5e7',
        elementId: 'dial2',
        showFilters: 'true',
        showSeries: 'false',
        height: '200',
        token: token,
        fitTableWidth: 'true'
    });
    yellowfin.loadReport({
        reportUUID: 'a02e7b80-c28d-4897-92d6-9c1e8e032026',
        elementId: 'dial3',
        showFilters: 'true',
        showSeries: 'false',
        height: '200',
        token: token,
        fitTableWidth: 'true'
    });
    yellowfin.loadReport({
        reportUUID: '4171cbd5-cdf1-4aa4-9b3d-355cd5139ca9',
        elementId: 'linechart',
        showFilters: 'true',
        showSeries: 'false',
        height: '200',
        token: token,
        fitTableWidth: 'true'
    });
    yellowfin.loadReport({
        reportUUID: '6e0eb0fd-03b2-4dc1-9bfb-98e37242857f',
        elementId: 'report_table',
        display: 'table',
        showFilters: 'true',
        showSeries: 'false',
        token: token,
        fitTableWidth: 'true'
    });


    yellowfin.loadDash({
        dashUUID: '1e68d9cc-fa5a-44e2-816d-782aa40ceeae',
        elementId: 'campaign_dashboard',
        showFilters: 'true',
        showSeries: 'false',
        token: token,
        fitTableWidth: 'true'
    });
    yellowfin.dash.loadDashFilters('1e68d9cc-fa5a-44e2-816d-782aa40ceeae', filterCallback);

}
function reloadDash(token) {
    console.log(token);
    filterValues = {};
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
        token: token,
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
        buttonWidth: '120px',
        includeSelectAllOption: true,
        nonSelectedText: 'Company'
    });
    $('#region-filter').multiselect({
        buttonWidth: '120px',
        includeSelectAllOption: true,
        nonSelectedText: 'Region'
    });
    $('#campaign-filter').multiselect({
        buttonWidth: '120px',
        includeSelectAllOption: true,
        nonSelectedText: 'Campaign'
    });
}






