// First of all, query the necessary elements.
var provinceSelect = document.querySelector("select[name=\"province\"]");
var citySelect = document.querySelector("select[name=\"city\"]");
var schoolSelect = document.querySelector("select[name=\"school\"]");

/* 
    Add provinces, and addEventListener for the select area.
*/
addProvinces();
provinceSelect.addEventListener("change", function() {
    // Firstly, remove options before.
    remove("city");
    remove("school");
    // Secondly, add new schools in the city user has selected.
    for(var i = 0; i < 32; i ++){
        // console.log(provinceSelect.children[i].selected);
        if(this.children[i].selected){
            i === 0 || addCities(10 + i - 1);
            return;
        }
    }
});
citySelect.addEventListener("change", function() {
    // Firstly, remove options before.
    remove("school");
    // Secondly, add new schools in the city user has selected.
    for(var i = 0; i < this.children.length; i ++){
        if(this.children[i].selected){
            var cityIndex = this.children[i].value;
            i === 0 || addSchools(cityIndex);
            return;
        }else{
            console.log("cuowu");
        }
    }
});

/**
 * Remove the options before when seleted.
 * @param {String} string "city" or "school"
 */
function remove(string){
    var options = document.querySelectorAll("select[name=\""+ string +"\"] option");
    for(var i = 0; i < options.length; i ++){
        options[i].remove();
    }
}
function addProvinces(){
    var provinceKeys = Object.keys(province);
    var provinceIndex = Number(provinceKeys[0]);
    var maxIndex = provinceKeys.length + Number(provinceKeys[0]);
    for(; provinceIndex < maxIndex; provinceIndex ++) {
        var option = document.createElement("option");
        option.setAttribute("value", provinceIndex + '');
        option.innerText = province[provinceIndex];
        provinceSelect.appendChild(option);
    }
}
/**
 * Add cities of the province, which user has selected.
 * @param {number} provinceIndex The index number of the province user selected.
 */
function addCities(provinceIndex){
    var cityKeys = Object.keys(city[provinceIndex]);
    var option = document.createElement("option");
    option.setAttribute("value", '0000');
    option.innerText = "请选择";
    citySelect.appendChild(option);
    for(var cityIndex = Number(cityKeys[0]); cityIndex < cityKeys.length + Number(cityKeys[0]); cityIndex ++) {
        var option = document.createElement("option");
        var cityAttribute = (cityIndex + "").padStart(3, "0");
        
        if((provinceIndex === 19) && (cityAttribute === "121")){
            cityAttribute = "099";
        }
        option.setAttribute("value", cityAttribute);
        option.innerText = city[provinceIndex][cityAttribute];
        citySelect.appendChild(option);
    }
}
/**
 * Add shools of the city, which user has selected.
 * @param {number} cityIndex The index number of the city user selected.
 */
function addSchools(cityIndex){
    var schoolsToAdd = allschool[(cityIndex + "").padStart(3, "0")];
    for(var schoolIndex = 0; schoolIndex < schoolsToAdd.length; schoolIndex ++) {
        var option = document.createElement("option");
        option.innerText = schoolsToAdd[schoolIndex];
        schoolSelect.appendChild(option);
    }
}








