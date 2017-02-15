$(document).ready(function(){
    
    var total_click = 0;
    
    var powerClick = 1;    
    var power_initial = 10;
    var power_costBase = 1.5;
    var power_nombre = 0;
    var power_prix = 15;
    
    var powerAutoClick = 0;
    var prixAuto = 5;
    var nbAuto = 1;
    
    var tickAutoClick = 1000;
    var prixTick = 50;
    var nbTick = 1;
    
    var batUn_initial = 10;
    var batUn_costBase = 1.2;
    var batUn_nombre = 0;
    var batUn_prix = 12;
    
    var batUn_mult = 1;
    var batUn_mult_prix = 500;
    

    $('#click').click(function(){
        total_click += powerClick;
        $("#total_clicks").text(total_click);
        buttonUpdate();
    });
    
    $("#buy_auto_click").click(function(){
        if(total_click >= prixAuto){
            
            total_click -= Math.ceil((Math.pow(5, nbAuto)-1)/(5 - 1));
            nbAuto++;
            prixAuto = Math.ceil((Math.pow(5, nbAuto)-1)/(5 - 1));
            
            $("#buy_auto_click").text("Buy for " + prixAuto);
            $("#autoclicker_level").text("lvl " + (nbAuto-1));
            $("#total_clicks").text(total_click);
            
            buttonUpdate();
        }
    });
    
    $("#increase_clicks").click(function(){
        if(total_click >= power_prix){
            
            // (prix_dep^num_upgrade - 1) / (prix_dep - 1)
            total_click -= Math.ceil(power_initial*(Math.pow(power_costBase, power_nombre+1)));
            power_nombre++;
            powerClick++;
            power_prix = Math.ceil(power_initial*(Math.pow(power_costBase, power_nombre+1)));
            
            $("#increase_clicks").text("Buy for " + power_prix);
            $("#power_level").text("lvl " + (power_nombre));
            $("#total_clicks").text(total_click);
            $("#power_clicks").text(powerClick);
            buttonUpdate();
        }
    });
    
    $("#auto_liker").click(function(){
        if(total_click >= batUn_prix){

            // (prix_dep^num_upgrade - 1) / (prix_dep - 1)
            total_click -= Math.ceil(batUn_initial*(Math.pow(batUn_costBase, batUn_nombre+1)));
            batUn_nombre++;
            $("#clicks_per_second").text(batUn_nombre*batUn_mult);
            batUn_prix = Math.ceil(batUn_initial*(Math.pow(batUn_costBase, batUn_nombre+1)));

            $("#auto_liker").text("Buy for " + batUn_prix);
            $("#auto_liker_level").text("lvl " + (batUn_nombre));
            $("#total_clicks").text(total_click);
            
            buttonUpdate();
        }
    });
    
    $("#mult1").click(function() {
        if(total_click >= batUn_mult_prix){
            batUn_mult++;
            $("#mult1").hide();
        }
    });
    
    
    var buttonUpdate = function(){
        if(total_click >= prixAuto){
            $("#buy_auto_click").removeClass("btn-danger");
            $("#buy_auto_click").addClass("btn-success");
        } else {
            $("#buy_auto_click").addClass("btn-danger");
            $("#buy_auto_click").removeClass("btn-success");
        }
        if(total_click >= power_prix){
            $("#increase_clicks").removeClass("btn-danger");
            $("#increase_clicks").addClass("btn-success");
        } else {
            $("#increase_clicks").addClass("btn-danger");
            $("#increase_clicks").removeClass("btn-success");
        }
        if(total_click >= batUn_prix){
            $("#auto_liker").removeClass("btn-danger");
            $("#auto_liker").addClass("btn-success");
        } else {
            $("#auto_liker").addClass("btn-danger");
            $("#auto_liker").removeClass("btn-success");
        }
        if(total_click >= batUn_mult_prix && batUn_mult < 2){
            $("#mult1").show();
        }
    };
    
    function ajoutAuto(number){
        total_click += number;
        $("#total_clicks").text(total_click);
    };

    window.setInterval(function(){

        ajoutAuto(batUn_nombre*batUn_mult);

        buttonUpdate();

    }, tickAutoClick);   
    
});