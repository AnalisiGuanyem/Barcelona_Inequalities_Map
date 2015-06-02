var data;var selector01;var selector02;var pieData = [];var colorData = [];var colorData_dis = [];var colorDataCuartils = [];var pieData_modal = [];var noms_barri = [];var noms_barri_per_taula = [];var file_noms_barri = "dades/nomsbarris.csv";
var nom_col1 = "";var nom_col2 = "";var colorDataCuartils = [];var colorDataCuartils2col = [];var selector01 = [];var selector03 = [];var ordreTaulaCuartils = [];var selectorbarri_taula = [];var slct01 = [];var slct03 = [];var t1 = false;var t2 = false;var conta = 0;var Transform = [];var Transform2 = [];var Transform3 = [];var Transform_districte = [];var Districte = false;var VMax;var VMin;var reset1 = false;var reset2 = false;var fletxaon = false;var esperansa = false;

$(document).ready(function() {

    $('#fletxa').on('click',function () {

            var target = '#taula_final';
            var $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        $('#fletxa').animate({opacity: 0, width: '+=100', height: '+=100', 'margin-left': '-=42' }, 800);
        });

        function carregaNomsBarri(file) {
            noms_barri.length = 0;
            Papa.parse(file, {
                download: true,
                complete: function(results) {
                    selectorbarri = results.data;
                    var foobarri = new Array(73);
                    for (var i = 0; i < foobarri.length; i++) {
                        nombarrri(selectorbarri, i);
                    }
                }
            });
        }

        function carregaNomsBarriperTaula(file) {
            noms_barri_per_taula.length = 0;
            Papa.parse(file, {
                download: true,
                complete: function(results) {
                    selectorbarri_taula = results.data;
                    var foobarri = new Array(73);
                    for (var i = 0; i < foobarri.length; i++) {
                        nombarrri(selectorbarri_taula, i);
                    }
                    selectorbarri_taula.reverse();
                }
            });
        }

        function nombarrri(dadesbarri, n) {
            var barri = dadesbarri[n];
            noms_barri.push(
                barri
            );
        }


    revelaText();

    carregaNomsBarri(file_noms_barri);
    carregaNomsBarriperTaula(file_noms_barri);

    var num_b = new Array(73);
    for (var i = 0; i < num_b.length; i++) {
        $('#bola' + i + '_e').click(function() {
            var status = $(this).attr('id');
            var num1 = status[4];
            var num2 = status[5];

            if (num2 == "_") {
                var num_total = parseInt(num1);
            } else {
                var num_total = parseInt(num1 + num2);
            }

            var col2 = pieData_modal[num_total];

            if (Districte == false) {
                var col1 = colorData[num_total];
            }
            else if (Districte == true) {
                var col1_Trnsfm = colorData;
                col1_Trnsfm.reverse();
                var col1 = col1_Trnsfm[num_total];
                Districte = false;
            }

            var elbarrio = noms_barri[num_total];

            if (col1 == undefined) {
                col1 = "Escollir 1er paràmetre";
            }
            if (col2 == undefined) {
                col2 = "Escollir 2n paràmetre";
            }

            if (esperansa==false) {
                swal({
                    title: "",
                    html: "" + nom_col1 + "<br><h2>" + col1 + "</h2><br>" + nom_col2 + "<br><h2>" + col2 + " %</h2><br><h3>" + elbarrio + "</h3>",
                    type: "info",
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    width: 460,
                    confirmButtonColor: "#fff",
                    confirmButtonText: "x"
                });
            }
            else if (esperansa==true) {
                swal({
                    title: "",
                    html: "" + nom_col1 + "<br><h2>" + col1 + "</h2><br>" + nom_col2 + "<br><h2>-" + col2 + "</h2><br><h3>" + elbarrio + "</h3>",
                    type: "info",
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    width: 460,
                    confirmButtonColor: "#fff",
                    confirmButtonText: "x"
                });
            }
        });
    }

/***** Final (document).ready() *****/


$("#reset").click(function() {
        nom_col1 = "Escollir 1er paràmetre";
        $("#titol1").text("&nbsp;");
        reset1 = true;
        PreparaAnys();
        ResetTaulaCol1();
}); 

$("#reset2").click(function() {
        file = "dades/esborra0.csv";
        nom_col2 = "Escollir 2n paràmetre";
        $("#titol2").text(" ");
        pieData_modal.length = 0;
        reset2 = true;
        handleFileSelect_pastissos(file);
        ResetTaulaCol2();
}); 


    function revelaText() {
        $(".text").delay(2500).fadeIn(700);
    }


    /******* Principi pinta series temporals (1r. select) ******/

function PreparaAnys() {
    file1 ="";
    file2 ="";
    file3 ="";
    file4 ="";
    file5 ="";
    file6 ="";
    if (nom_col1 == "Escollir 1er paràmetre") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/esborra0.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }
    else if (nom_col1 == "RENDA FAMILIAR") {
        $(".any01").css("color", "#000");$(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");
        $(".any01").css("background-color", "#f69c8b");$(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        Districte = false;
        netejaTaulacol1();
        $("#t_spinner").css("opacity", "0.6");
        $("#t_spinner").css("z-index", "998");
        $(".etiqueta").fadeTo("slow", 1);
        $(".any01").fadeTo("slow", 1);
        $(".any02").fadeTo("slow", 1);
        $(".any03").fadeTo("slow", 1);
        $(".any04").fadeTo("slow", 1);
        $(".any05").fadeTo("slow", 1);
        $(".any06").fadeTo("slow", 1);
        $(".any06").css("background-color", "#000");
        $(".any06").css("color", "#fcded9");
        colorData_dis.length = 0;
        file1 = "dades/rfbd2008.csv";
        file2 = "dades/rfbd2009.csv";
        file3 = "dades/rfbd2010.csv";
        file4 = "dades/rfbd2011.csv";
        file5 = "dades/rfbd2012.csv";
        file6 = "dades/rfbd2013.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_distribucio(file2);
        handleFileSelect_distribucio(file3);
        handleFileSelect_distribucio(file4);
        handleFileSelect_distribucio(file5);
        handleFileSelect_distribucio(file6);
        handleFileSelect_cuartils_distrib(file6);
        $(".any01").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib(file1);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any02").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib(file2);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any01").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");
            $(".any01").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any03").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib(file3);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any02").css("color", "#000");$(".any01").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");            
            $(".any02").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any04").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib(file4);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9"); 
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any01").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");           
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any05").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib(file5);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9"); 
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any01").css("color", "#000");$(".any06").css("color", "#000");          
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any06").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib(file6);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any01").css("color", "#000");            
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any01 ").css("background-color", "#f69c8b");
        });
    }


    else if (nom_col1 == "RENDA FAMILIAR (2013)") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/rfbd2013.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

    else if (nom_col1 == "DENSITAT DE POBLACIÓ") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/densitat-neta.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

    else if (nom_col1 == "ALLOTJAMENT TURISTIC") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/allotjament_turistic_total.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

    else if (nom_col1 == "POBLACIÓ SENSE ESTUDIS") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/percent_sense_estudis_2.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

    else if (nom_col1 == "POBLACIÓ (2014)") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/poblacio.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

    else if (nom_col1 == "VALOR DEL SÒL") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/valor_sol_2.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

    else if (nom_col1 == "NOMBRE DE LLARS") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/llars_barri.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }
    
    else if (nom_col1 == "BENEFICIARIS PIRMI PER DISTRICTES") {
        $(".any01").css("color", "#000");$(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");
        $(".any01").css("background-color", "#f69c8b");$(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        Districte = true;
        netejaTaulacol1();
        $("#t_spinner").css("opacity", "0.6");
        $("#t_spinner").css("z-index", "998");
        $(".etiqueta").fadeTo("slow", 1);
        $(".any01").fadeTo("slow", 0.3);
        $(".any02").fadeTo("slow", 1);
        $(".any03").fadeTo("slow", 1);
        $(".any04").fadeTo("slow", 1);
        $(".any05").fadeTo("slow", 1);
        $(".any06").fadeTo("slow", 1);
        $(".any06").css("background-color", "#000");
        $(".any06").css("color", "#fcded9");
        colorData_dis.length = 0;
        file2 = "dades/pirmi2009.csv";
        file3 = "dades/pirmi2010.csv";
        file4 = "dades/pirmi2011.csv";
        file5 = "dades/pirmi2012.csv";
        file6 = "dades/pirmi2013.csv";
        handleFileSelect_distribucio(file2);
        handleFileSelect_distribucio(file3);
        handleFileSelect_distribucio(file4);
        handleFileSelect_distribucio(file5);
        handleFileSelect_distribucio(file6);
        handleFileSelect_cuartils_distrib_districte(file6);
        $(".any02").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file2);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");
            $(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any03").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file3);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any02").css("color", "#000");$(".any01").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");            
            $(".any02").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any04").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file4);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9"); 
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any01").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");           
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any05").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file5);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9"); 
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any01").css("color", "#000");$(".any06").css("color", "#000");          
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any06").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file6);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any01").css("color", "#000");            
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any01 ").css("background-color", "#f69c8b");
        });
    }

    else if (nom_col1 == "ATUR REGISTRAT (2014)") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/atur2014_pastis.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

    else if (nom_col1 == "ESPERANÇA DE VIDA") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/esperansa_vida_anys_nou.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

    else if (nom_col1 == "ATUR REGISTRAT PER DISTRICTES") {
        $(".any01").css("color", "#000");$(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");
        $(".any01").css("background-color", "#f69c8b");$(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        Districte = true;
        netejaTaulacol1();
        $("#t_spinner").css("opacity", "0.6");
        $("#t_spinner").css("z-index", "998");
        $(".etiqueta").fadeTo("slow", 1);
        $(".any01").fadeTo("slow", 0.3);
        $(".any02").fadeTo("slow", 1);
        $(".any03").fadeTo("slow", 1);
        $(".any04").fadeTo("slow", 1);
        $(".any05").fadeTo("slow", 1);
        $(".any06").fadeTo("slow", 1);
        $(".any06").css("background-color", "#000");
        $(".any06").css("color", "#fcded9");
        colorData_dis.length = 0;
        file2 = "dades/atur2009.csv";
        file3 = "dades/atur2010.csv";
        file4 = "dades/atur2011.csv";
        file5 = "dades/atur2012.csv";
        file6 = "dades/atur2013.csv";
        handleFileSelect_distribucio(file2);
        handleFileSelect_distribucio(file3);
        handleFileSelect_distribucio(file4);
        handleFileSelect_distribucio(file5);
        handleFileSelect_distribucio(file6);
        handleFileSelect_cuartils_distrib_districte(file6);
        $(".any02").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file2);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");
            $(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any03").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file3);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any02").css("color", "#000");$(".any01").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");            
            $(".any02").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any04").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file4);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9"); 
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any01").css("color", "#000");$(".any05").css("color", "#000");$(".any06").css("color", "#000");           
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any05").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file5);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9"); 
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any01").css("color", "#000");$(".any06").css("color", "#000");          
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any01").css("background-color", "#f69c8b");$(".any06 ").css("background-color", "#f69c8b");
        });
        $(".any06").click(function() {
            netejaTaulacol1();
            handleFileSelect_cuartils_distrib_districte(file6);
            $(this).css("background-color", "#000");
            $(this).css("color", "#fcded9");
            $(".any02").css("color", "#000");$(".any03").css("color", "#000");$(".any04").css("color", "#000");$(".any05").css("color", "#000");$(".any01").css("color", "#000");            
            $(".any02").css("background-color", "#f69c8b");$(".any03").css("background-color", "#f69c8b");$(".any04").css("background-color", "#f69c8b");$(".any05").css("background-color", "#f69c8b");$(".any01 ").css("background-color", "#f69c8b");
        });
    }

    else if (nom_col1 == "COBERTURA SANITÀRIA PÚBLICA") {
        Districte = true;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/cobertura_sanitaria_publica.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib_districte(file1);
    }

    else if (nom_col1 == "COBERTURA SANITÀRIA PRIVADA") {
        Districte = true;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/cobertura_sanitaria_privada.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib_districte(file1);
    }
    else if (nom_col1 == "ELECTORS (TOTAL)") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/electors_inv.csv"; //Utilitzant taula invertida! Localitzar Bug
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }
    else if (nom_col1 == "ABSTENCIÓ") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/percent_abstencio.csv";
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }
    else if (nom_col1 == "CANVIS DE DOMICILI") {
        Districte = false;
        netejaTaulacol1();
        $(".etiqueta").fadeTo("slow", 0);
        $(".any01").fadeTo("slow", 0);
        $(".any02").fadeTo("slow", 0);
        $(".any03").fadeTo("slow", 0);
        $(".any04").fadeTo("slow", 0);
        $(".any05").fadeTo("slow", 0);
        $(".any06").fadeTo("slow", 0);
        colorData_dis.length = 0;
        file1 = "dades/canvi_domicili_inv.csv"; //Utilitzant taula invertida! Localitzar Bug
        handleFileSelect_distribucio(file1);
        handleFileSelect_cuartils_distrib(file1);
    }

}

function handleFileSelect_distribucio(file) {
            console.log(file);
            Papa.parse(file, {
                download: true,
                complete: function(results) {
                    selector03 = results.data;
                    var foo3 = new Array(73);
                    for (var i = 0; i < foo3.length; i++) {
                        PreparaArrayDistribucio(selector03, i);
                    }
                }
            });        
} 

function PreparaArrayDistribucio(dades, n) {
        var num_color_dis = parseFloat(dades[n]);
        colorData_dis.push(num_color_dis);
        colorDataCuartils_dis = colorData_dis.slice();
        VMax = jQuery.minimum(colorDataCuartils_dis);
        VMin = jQuery.maximum(colorDataCuartils_dis);

        $("#vmax").text("Max."+VMin);
        $("#vmin").text("Min."+VMax);
}

function handleFileSelect_cuartils_distrib(file) {
        colorData.length = 0;
        Papa.parse(file, {
            download: true,
            complete: function(results) {
                selector03 = results.data;
                var foo3 = new Array(73);
                for (var i = 0; i < foo3.length; i++) {
                    PreparaArrayCuartils(selector03, i);
                }
                slct03 = selector03;
                slct03.reverse();
                t1 = true;
                quanpinto(t1,t2);
                TallaCuartils_distrib();
            }
        });
}

function handleFileSelect_cuartils_distrib_districte(file) {
        colorData.length = 0;
        Papa.parse(file, {
            download: true,
            complete: function(results) {
                selector03 = results.data;
                var foo3 = new Array(73);
                for (var i = 0; i < foo3.length; i++) {
                    PreparaArrayCuartils(selector03, i);
                }
                slct03 = selector03;
                slct03.reverse();
                t1 = true;
                quanpintoDis(t1,t2);
                TallaCuartils_distrib_districte();
            }
        });
}

function handleFileSelect_cuartils_distrib_neg(file) {
        colorData.length = 0;
        Papa.parse(file, {
            download: true,
            complete: function(results) {
                selector03 = results.data;
                var foo3 = new Array(73);
                for (var i = 0; i < foo3.length; i++) {
                    PreparaArrayCuartils(selector03, i);
                }
                slct03 = selector03;
                slct03.reverse();
                t1 = true;
                quanpinto(t1,t2);
                TallaCuartils_distrib_neg();
            }
        });
}

function TallaCuartils_distrib() {

    if (VMax==0 & VMin==0) {
        var foo10 = new Array(73);
        for (var j = 0; j < foo10.length; j++) {
            $('#bola' + j).animate({backgroundColor: "#fff"}, 800);
        }
    }
    else
    {
        var foo5 = new Array(73);
        for (var i = 0; i < foo5.length; i++) {
            Transform[i]= 5 * ((colorData[i] - VMin) / (VMax - VMin));   
        }
        $("#t_spinner").css("opacity", "0");
        $("#t_spinner").css("z-index", "0");
        var foo4 = new Array(73);
        for (var j = 0; j < foo4.length; j++) {
            if (Transform[j].toFixed(1) >= 0 && Transform[j].toFixed(1) <= 1) {
                $('#bola' + j).animate({
                    backgroundColor: "#f05a3f"
                }, 800);
            } else if (Transform[j].toFixed(1) > 1 && Transform[j].toFixed(1) <= 2) {
                $('#bola' + j).animate({
                    backgroundColor: "#f4836f"
                }, 800);
            } else if (Transform[j].toFixed(1) > 2 && Transform[j].toFixed(1) <= 3) {
                $('#bola' + j).animate({
                    backgroundColor: "#f7ac9f"
                }, 800);
            } else if (Transform[j].toFixed(1) > 3 && Transform[j].toFixed(1) <= 4) {
                $('#bola' + j).animate({
                    backgroundColor: "#fac5bc"
                }, 800);
            } else if (Transform[j].toFixed(1) > 4 && Transform[j].toFixed(1) <= 5) {
                $('#bola' + j).animate({
                    backgroundColor: "#fdedea"
                }, 800);
            }
        }
    }
}

function TallaCuartils_distrib_districte() {


        var foo5 = new Array(73);
        for (var i = 0; i < foo5.length; i++) {
            Transform_districte[i]= 5 * ((colorData[i] - VMin) / (VMax - VMin));   
        }
        Trnsfm = Transform_districte;
        Trnsfm.reverse();
        $("#t_spinner").css("opacity", "0");
        $("#t_spinner").css("z-index", "0");
        var foo4 = new Array(73);
        for (var j = 0; j < foo4.length; j++) {
        //for (var j = 72; j >= 0; j--) {
            if (Transform_districte[j].toFixed(1) >= 0 && Transform_districte[j].toFixed(1) <= 1) {
                $('#bola' + j).animate({
                    backgroundColor: "#f05a3f"
                }, 800);
            } else if (Transform_districte[j].toFixed(1) > 1 && Transform_districte[j].toFixed(1) <= 2) {
                $('#bola' + j).animate({
                    backgroundColor: "#f4836f"
                }, 800);
            } else if (Transform_districte[j].toFixed(1) > 2 && Transform_districte[j].toFixed(1) <= 3) {
                $('#bola' + j).animate({
                    backgroundColor: "#f7ac9f"
                }, 800);
            } else if (Transform_districte[j].toFixed(1) > 3 && Transform_districte[j].toFixed(1) <= 4) {
                $('#bola' + j).animate({
                    backgroundColor: "#fac5bc"
                }, 800);
            } else if (Transform_districte[j].toFixed(1) > 4 && Transform_districte[j].toFixed(1) <= 5) {
                $('#bola' + j).animate({
                    backgroundColor: "#fdedea"
                }, 800);
            }
        }
}

function TallaCuartils_distrib_neg() {


        var foo5 = new Array(73);
        for (var i = 0; i < foo5.length; i++) {
            Transform[i]= 5 * ((colorData[i] - VMin) / (VMax - VMin));   
        }
        $("#t_spinner").css("opacity", "0");
        $("#t_spinner").css("z-index", "0");
        var foo4 = new Array(73);
        for (var j = 0; j < foo4.length; j++) {
            if (Transform[j].toFixed(1) >= 0 && Transform[j].toFixed(1) <= 1) {
                $('#bola' + j).animate({
                    backgroundColor: "#fdedea"
                }, 800);
            } else if (Transform[j].toFixed(1) > 1 && Transform[j].toFixed(1) <= 2) {
                $('#bola' + j).animate({
                    backgroundColor: "#fac5bc"
                }, 800);
            } else if (Transform[j].toFixed(1) > 2 && Transform[j].toFixed(1) <= 3) {
                $('#bola' + j).animate({
                    backgroundColor: "#f7ac9f"
                }, 800);
            } else if (Transform[j].toFixed(1) > 3 && Transform[j].toFixed(1) <= 4) {
                $('#bola' + j).animate({
                    backgroundColor: "#f4836f"
                }, 800);
            } else if (Transform[j].toFixed(1) > 4 && Transform[j].toFixed(1) <= 5) {
                $('#bola' + j).animate({
                    backgroundColor: "#f05a3f"
                }, 800);
            }
        }
}

function handleFileSelect_cuartils(file) {
        colorData.length = 0;
        Papa.parse(file, {
            download: true,
            complete: function(results) {
                selector03 = results.data;
                var foo3 = new Array(73);
                for (var i = 0; i < foo3.length; i++) {
                    PreparaArrayCuartils(selector03, i);
                }
                slct03 = selector03;
                slct03.reverse();
                t1 = true;
                quanpinto(t1,t2);
                TallaCuartils();
            }
        });
}

    function PreparaArrayCuartils(dades, n) {
        var num_color = parseFloat(dades[n]);
        colorData.push(num_color);
        colorDataCuartils = colorData.slice();
    }

    function TallaCuartils() {

        var VMax = jQuery.minimum(colorDataCuartils);
        var VMin = jQuery.maximum(colorDataCuartils);

        var foo5 = new Array(73);
        for (var i = 0; i < foo5.length; i++) {
            Transform[i]= 5 * ((colorData[i] - VMin) / (VMax - VMin));   
        }
        $("#t_spinner").css("opacity", "0");
        $("#t_spinner").css("z-index", "0");
        var foo4 = new Array(73);
        for (var i = 0; i < foo4.length; i++) {
            if (Transform[i].toFixed(1) >= 0 && Transform[i].toFixed(1) <= 1) {
                $('#bola' + i).animate({
                    backgroundColor: "#f05a3f"
                }, 800);
            } else if (Transform[i].toFixed(1) > 1 && Transform[i].toFixed(1) <= 2) {
                $('#bola' + i).animate({
                    backgroundColor: "#f4836f"
                }, 800);
            } else if (Transform[i].toFixed(1) > 2 && Transform[i].toFixed(1) <= 3) {
                $('#bola' + i).animate({
                    backgroundColor: "#f7ac9f"
                }, 800);
            } else if (Transform[i].toFixed(1) > 3 && Transform[i].toFixed(1) <= 4) {
                $('#bola' + i).animate({
                    backgroundColor: "#fac5bc"
                }, 800);
            } else if (Transform[i].toFixed(1) > 4 && Transform[i].toFixed(1) <= 5) {
                $('#bola' + i).animate({
                    backgroundColor: "#fdedea"
                }, 800);
            }
        }
    }

    /******* Fi pinta quartils ******/

    /******* Principi omple pastissos ******/

    function handleFileSelect_pastissos(file) {
        pieData.length = 0;
        Papa.parse(file, {
            download: true,
            complete: function(results) {
                selector01 = results.data;
                var foo = new Array(73);
                for (var i = 0; i < foo.length; i++) {
                    omplePastissos(selector01, i);
                }
                slct01 = selector01;
                slct01.reverse();
                for (var i=0; i<slct01.length; i++)    
                {
                    slct01[i] = parseFloat(slct01[i]);
                }
                t2 = true;
                quanpinto(t1,t2);
            }
        });
    }

    function omplePastissos(dades, n) {

        var num_pie = parseFloat(dades[n]);
        pieData_modal.push(
            num_pie
        );

        colorDataCuartils2col = pieData_modal.slice();


        var num = parseFloat(dades[n]);
        var resta = 100 - num;
        pieData = [];
        pieData.push({
            value: num,
            color: "#000",
        });
        pieData.push({
            value: resta,
            color: "transparent",
        });
        Pastis(n);
    }

    function Pastis(n) {
        var ctx = document.getElementById("chart-area" + n).getContext("2d");
        window.myPie = new Chart(ctx).Pie(pieData, {
            showTooltips: false,
            animationSteps: 35,
            segmentShowStroke: false
        });
    }

    /******* Fi omple pastissos ******/


    /******* Pinta taules ******/
function quanpinto (t1,t2) {
    if (t1 == true && t2 == true)
    {
    	function omple_altres() {
    		document.getElementById('t_col1').innerHTML = nom_col1;
            if (esperansa == true) {
    		document.getElementById('t_col2').innerHTML = nom_col2;
            }
            else if (esperansa == false) {
            document.getElementById('t_col2').innerHTML = nom_col2 + " (%)";
            }
        	document.getElementById('t_col_barri').innerHTML = "BARRI";
        	$("#titol_llegenda").show();
        	$("#taula_final").show();
    	}
		$.when(pintaTaula(slct01,slct03)).done(omple_altres()).done(TallaCuartilsTaulaCol()).done(revela_fletxa()).done(TallaCuartilsTaulaCol2());
    }
}

function revela_fletxa () {
    if (fletxaon==false) {
        $('#fletxa').animate({opacity: 1, width: '-=100', height: '-=100', 'margin-left': '+=42' }, 800);
        fletxaon = true;
    }
}

function quanpintoDis (t1,t2) {
    if (t1 == true && t2 == true)
    {
        function omple_altres() {
            document.getElementById('t_col1').innerHTML = nom_col1;
            document.getElementById('t_col2').innerHTML = nom_col2 + " (%)";
            document.getElementById('t_col_barri').innerHTML = "BARRI";
            $("#titol_llegenda").show();
            $("#taula_final").show();
        }
        slct01.reverse();
        slct03.reverse();
        $.when(pintaTaula(slct01,slct03)).done(omple_altres()).done(TallaCuartilsTaulaCol()).done(TallaCuartilsTaulaCol2());
    }
}

function netejaTaulacol1() {
        var foo = new Array(73);
        for (var i = 0; i < foo.length; i++) {
            $('#col1dades'+i).html('0');
        }
}

function pintaTaula(slct01,slct03) {
    var foo = new Array(73);
        for (var i = 0; i < foo.length; i++) {
            $('#colbarri'+i).html(selectorbarri_taula[i]);
            $('#col1dades'+i).html(slct03[i]);
            if (esperansa == true) {
                if (slct01[i] !=0) {
                    $('#col2dades'+i).html("-"+slct01[i]);
                }
                else {
                    $('#col2dades'+i).html(slct01[i]);   
                }
            }
            else if (esperansa == false) {
                $('#col2dades'+i).html(slct01[i]);
            }
        }
}

function TallaCuartilsTaulaCol() {
        var foo5 = new Array(73);
        for (var i = 0; i < foo5.length; i++) {
            Transform2[i]= 5 * ((slct03[i] - VMin) / (VMax - VMin));   
        }

        for (var i = 0; i < 73; i++) {
        	var j = 72-i;
            if (Transform2[j] >= 0 && Transform2[j] <= 1) {
                $('#col1dades'+j).css('background-color', '#f05a3f');
            } else if (Transform2[j] > 1 && Transform2[j] <= 2) {
                $('#col1dades'+j).css('background-color', '#f4836f');
            } else if (Transform2[j] > 2 && Transform2[j] <= 3) {
                $('#col1dades'+j).css('background-color', '#f7ac9f');
            } else if (Transform2[j] > 3 && Transform2[j] <= 4) {
                $('#col1dades'+j).css('background-color', '#fac5bc');
            } else if (Transform2[j] > 4 && Transform2[j] <= 5) {
                $('#col1dades'+j).css('background-color', '#fdedea');
            }
        }
}

function TallaCuartilsTaulaCol2() {
        VMax_col2 = jQuery.minimum(slct01);
        VMin_col2 = jQuery.maximum(slct01);

        var foo5 = new Array(73);
        for (var i = 0; i < foo5.length; i++) {
            Transform3[i]= 5 * ((slct01[i] - VMin_col2) / (VMax_col2 - VMin_col2));   
        }

        for (var i = 0; i < 73; i++) {
            var j = 72-i;
            if (Transform3[j] >= 0 && Transform3[j] <= 1) {
                $('#col2dades'+j).css('background-color', '#f05a3f');
            } else if (Transform3[j] > 1 && Transform3[j] <= 2) {
                $('#col2dades'+j).css('background-color', '#f4836f');
            } else if (Transform3[j] > 2 && Transform3[j] <= 3) {
                $('#col2dades'+j).css('background-color', '#f7ac9f');
            } else if (Transform3[j] > 3 && Transform3[j] <= 4) {
                $('#col2dades'+j).css('background-color', '#fac5bc');
            } else if (Transform3[j] > 4 && Transform3[j] <= 5) {
                $('#col2dades'+j).css('background-color', '#fdedea');
            }
        }
}

function ResetTaulaCol1() {
        for (var i = 0; i < 73; i++) {
            var j = 72-i;
                $('#col1dades'+j).css('background-color', '#fdedea');
        }
}

function ResetTaulaCol2() {
        for (var i = 0; i < 73; i++) {
            var j = 72-i;
                $('#col2dades'+j).css('background-color', '#fdedea');
        }
}

    /******* Fi Pinta taules ******/


    /***** Arrays Selects *****/

    var ddData = [{
        text: "Renda familiar (2013)",
        value: 17,
        selected: false,
    }, {
        text: "Electors",
        value: 13,
        selected: false,
    }, {
        text: "Places turístiques",
        value: 3,
        selected: false,
    }, {
        text: "Atur registrat (2014)",
        value: 9,
        selected: false,
    }, {
        text: "Ajuts socials",
        value: 7,
        selected: false,
    }, {
        text: "Població (2014)",
        value: 1,
        selected: false,
    }, {
        text: "Densitat de població",
        value: 2,
        selected: false,
    }, {
        text: "Renda familiar (2008-2013)",
        value: 4,
        selected: false,
    }, {
        text: "Esperança de vida",
        value: 16,
        selected: false,
    }, {
        text: "Valor del sòl (€/m2)",
        value: 5,
        selected: false,
    }, {
        text: "Nombre de llars",
        value: 6,
        selected: false,
    }, {
        text: "Sanitat pública",
        value: 10,
        selected: false,
    }, {
        text: "Sanitat privada",
        value: 11,
        selected: false,
    }, {
        text: "Sense estudis",
        value: 12,
        selected: false,
    }, {
        text: "Abstenció",
        value: 14,
        selected: false,
    }, {
        text: "Canvis de domicili",
        value: 15,
        selected: false,
    }];

    var ddData_2 = [{
        text: "Atur registrat (2014)",
        value: 7,
        selected: false,
    }, {
        text: "Abstenció",
        value: 1,
        selected: false,
    }, {
        text: "Pressió turística",
        value: 3,
        selected: false,
    }, {
        text: "Sense estudis",
        value: 2,
        selected: false,
    }, {
        text: "Sanitat privada",
        value: 6,
        selected: false,
    }, {
        text: "Sanitat pública",
        value: 5,
        selected: false,
    }, {
        text: "Ajuts socials (2013)",
        value: 4,
        selected: false,
    }, {
        text: "Esperança de vida",
        value: 8,
        selected: false,
    }];

    /***** Fi Arrays Selects *****/


    /***** Select llista 01 *****/
    $('#select_cuartils').ddslick({
        data: ddData,
        width: 133,
        selectText: "Escull el 1er paràmetre",
        onSelected: function(data) {
            $("#escala").fadeTo("slow", 1);
            var triat = data.selectedData.value;
            if (triat == 1) {
                nom_col1 = "POBLACIÓ (2014)";
                $("#titol1").text("Població (2014)");
                $("#textcampanya").html("Barcelona és una ciutat amb 73 barris, uns més poblats que d'altres (els que al mapa veieu d'un color més fosc).<br> Trieu el paràmetre “Densitat” si voleu conèixer un altra dada sobre els nostres barris, tan diferents.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: <a href='http://www.bcn.cat/estadistica/catala/dades/tpob/ine/a2014/sexe/barri.htm' target='_new' class='font'>Ajuntament de Barcelona</a>");
                PreparaAnys();
            } else if (triat == 2) {
                nom_col1 = "DENSITAT DE POBLACIÓ";
                $("#titol1").text("Densitat de població");
                $("#textcampanya").html("Vivim en una ciutat mediterrània compacta i actualment les zones d’espai verd corresponen<br> a 6 m<sup>2</sup> per habitant, contra els 10 m<sup>2</sup> recomanats per l’Organització Mundial de la Salut.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: <a href='http://www.bcn.cat/estadistica/catala/dades/tpob/ine/a2014/sexe/barri.htm' target='_new' class='font'>Ajuntament de Barcelona</a><br>La densitat s'expressa aquí com la relació entre els habitants i la superfície del barri mesurada en km<sup>2</sup>");
                PreparaAnys();
            } else if (triat == 3) {
                nom_col1 = "ALLOTJAMENT TURISTIC";
                $("#titol1").text("Places turístiques declarades");
                $("#textcampanya").html("<b>El turisme es concentra en alguns barris, que en pateixen les conseqüències pero no en reben el beneficis.</b><br><br>El model productiu del Govern de CiU fomenta el monocultiu turístic quan cal diversificar l'activitat econòmica i aplicar una moratòria inmediata a l'obertura d'hotels i apartaments d'ús turístic.<br><br>La pressió hotelera sobre la població resident es pot calcular en termes de places per habitant, la qual cosa suposa a Ciutat Vella una plaça per cada 5 residents.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.:<a href='http://empresaiocupacio.gencat.cat/ca/treb_ambits_actuacio/emo_turisme/emo_empreses_establiments_turistics/emo_registre_turisme_catalunya/emo_llistat_establiments_turistics' target='_new' class='font'>Generalitat de Catalunya</a><br>Aquesta xifra suma els apartaments, els habitatges d'ús turistics declarats i les places d'hotels");
                PreparaAnys();
            } else if (triat == 4) {
                nom_col1 = "RENDA FAMILIAR";
                $("#titol1").text("Renda familiar disponible");
                $("#textcampanya").html("<b>la Renda Disponible condiciona l'esperança de vida, l'abstencionisme o l’accés a l'educació.</b><br><br>Una <strong>Renda Municipal</strong> per a totes les families sota el llindar de la pobresa que garanteixi que arribin a un mínim de 600€ evitaria una distribució de la renda tan desigual com la que el mapa mostra.<br><br>Més encara si hi afegiu les taxes d'atur o l'esperança de vida de cada zona.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: Grup d'ànalisi de dades, BComú 2015.<br>Fem servir com indicador la Renda familiar disponible per càpita (2008-2013).");
                PreparaAnys();
            } else if (triat == 5) {
                nom_col1 = "VALOR DEL SÒL";
                $("#titol1").text("Valor del sòl (2014)");
                $("#textcampanya").html("Sobre l'expulsió del comerç de barri per l'encariment dels preus degut a la pressió dels lobbies de la restauració i el turisme extractiu.");/*("De Barcelona hi marxen persones de tota condició, edat o país d'origen. D'una ciutat històricament atractiva per viure-hi, a un trampolí de sortida per cada cop més gent, també pel preu de l'habitatge.");*/
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.:<a href='http://www.bcn.cat/estadistica/catala/dades/timm/classol/locals/valor/a2014/VL02.htm' target='_new' class='font'>Ajuntament de Barcelona</a>Valor en €/m<sup>2</sup> dels locals comercials.");
                PreparaAnys();
            } else if (triat == 6) {
                nom_col1 = "NOMBRE DE LLARS";
                $("#titol1").text("Nombre de llars");
                $("#textcampanya").html("");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: Idescat. Característiques de les llars de Barcelona segons el Padró Municipal. Juny 2013.");
                PreparaAnys();
            } else if (triat == 7) {
                nom_col1 = "BENEFICIARIS PIRMI PER DISTRICTES";
                $("#titol1").text("% Beneficiaris PIRMI per districtes");
                $("#textcampanya").html("<b>La ciutadania pateix la crisi de forma desigual, sofrint a més la gestió d’un ajuntament d'esquenes als seus problemes.</b><br><br>El pla de xoc de Bcomú pretén prioritzar les persones i barris més vulnerables i menystinguts, que són els que més pateixen la crisi i les retallades.<br><br>Cal assegurar l’empadronament de totes les persones que habiten a la ciutat i llur accés a la targeta sanitària.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: Open Data Ajuntament BCN / Grup d'anàlisi de dades, BComú, 2015. Dades per districtes.");
                PreparaAnys();
            } else if (triat == 8) {
                nom_col1 = "ATUR REGISTRAT";
                $("#titol1").text("Atur registrat per barris (2014)");
                $("#textcampanya").html("Proposem posar en marxa un Programa de formació i creació indirecta d’ocupació sostenible que tindrà com a objectiu inicial la creació, a curt termini, de 2.500 llocs de treball i requerirà una inversió d’uns 50 milions d’euros.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("(Font 1a col.: Evolució de l'atur registrat al 2014 (L'atur registrat correspon a les demandes d’ocupació pendents de cobrir l’últim dia de cada mes).");
                PreparaAnys();
            } else if (triat == 9) {
                nom_col1 = "ATUR REGISTRAT (2014)";
                $("#titol1").text("Atur registrat (2014)");
                $("#textcampanya").html("<b>l’atur estructural als districtes menys afavorits divideix la ciutat en dos.</b><br><br>Proposem posar en marxa un Programa de formació i creació indirecta d’ocupació sostenible que tindrà com a objectiu inicial la creació, a curt termini, de 2.500 llocs de treball i requerirà una inversió d’uns 50 milions d’euros.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: <a href='http://opendata.bcn.cat/opendata/ca/catalog/OCUPACIO/aturevopercent/' target='_new' class='font'>Open Data Ajuntament BCN</a>. Percentatge d'atur registrat al gener de 2014");
                PreparaAnys();
            } else if (triat == 10) {
                nom_col1 = "COBERTURA SANITÀRIA PÚBLICA";
                $("#titol1").text("Cobertura sanitària pública per districtes");
                $("#textcampanya").html("Cal assegurar l’empadronament de totes les persones que habiten a la ciutat i llur accés a la targeta sanitària. La nostra aposta és per una sanitat pública de qualitat.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: Consorci Sanitari de Barcelona.<br>InfoABS, ús de serveis sanitaris (SISalut). Dades per districtes.");
                PreparaAnys();
            } else if (triat == 11) {
                nom_col1 = "COBERTURA SANITÀRIA PRIVADA";
                $("#titol1").text("Cobertura sanitària privada per districtes");
                $("#textcampanya").html("");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: <a href='http://www.aspb.cat/quefem/sisalutinfoabs/SISalutLlibresIndicadors/InfoABS_UsServeisSanitaris_2013.html' target='_new' class='font'>Consorci Sanitari de Barcelona.<br>InfoABS, ús de serveis sanitaris (SISalut)</a><br>Percentatge de persones amb cobertura sanitària mixta-privada. Dades per districtes.");
                PreparaAnys();
            } else if (triat == 12) {
                nom_col1 = "POBLACIÓ SENSE ESTUDIS";
                $("#titol1").text("Població sense estudis");
                $("#textcampanya").text("");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: <a href='http://opendata.bcn.cat/opendata/ca/catalog/POBLACIO#' target='_new' class='font'>Open Data Ajuntament de Barcelona</a>");
                PreparaAnys();
            } else if (triat == 13) {
                nom_col1 = "ELECTORS (TOTAL)";
                $("#titol1").text("Electors (2011)");
                $("#textcampanya").html("<b>Els barris més tocats per la crisi i les retallades son els que menys voten.</b><br><br>A les properes eleccions municipals hi poden votar les persones inscrites al cens, els electors.<br><br>Però una gran part no ho fa (trieu la opció “Abstenció” a la segona columna i comprovareu fins a quin punt és prioritari implicar a la ciutadania en els afers de la seva ciutat, via revolució democràtica).");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: <a href='http://www.bcn.cat/estadistica/catala/dades/inf/ele/ele27/A14.htm' target='_new' class='font'>Ajuntament de Barcelona</a>");
                PreparaAnys();
            } else if (triat == 14) {
                nom_col1 = "ABSTENCIÓ";
                $("#titol1").text("Abstenció (2011)");
                $("#textcampanya").html("Cal més implicació ciutadana i més participació ciutadana per resoldre entre totes i tos els problemes concrets de les persones que viuen a Barcelona. Cal una revolució democràtica ja!");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: <a href='http://www.bcn.cat/estadistica/catala/dades/inf/ele/ele27/A14.htm' target='_new' class='font'>Ajuntament de Barcelona</a>");
                PreparaAnys();
            } else if (triat == 15) {
                nom_col1 = "CANVIS DE DOMICILI";
                $("#titol1").text("Canvis de domicili");
                $("#textcampanya").html("De Barcelona hi marxen persones de tota condició, edat o país d'origen. D'una ciutat històricament atractiva per viure-hi, a un trampolí de sortida per cada cop més gent, també pel preu de l'habitatge.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: Ajuntament de Barcelona.<br>Canvis de domicili (2013)");
                PreparaAnys();
            } else if (triat == 16) {
                nom_col1 = "ESPERANÇA DE VIDA";
                $("#titol1").text("Esperança de vida per districtes");
                $("#textcampanya").html("");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: <a href='http://www.aspb.cat/quefem/docs/Salut_BCN_districtes_2013.pdf' target='_new' class='font'>Agència de Salut pública</a>, Consorci Sanitari de Barcelona (2012)."); //Nota: als barris de la Marina del Prat Vermell, la Clota, Can Peguera, Torre Baró, Vallbona i Baró de Viver hi fem constar el promig del respectiu districte per tenir poblacions de menys de 3000 hab.
                PreparaAnys();
            } else if (triat == 17) {
                nom_col1 = "RENDA FAMILIAR (2013)";
                $("#titol1").text("Renda familiar disponible (2013)");
                $("#textcampanya").html("<b>la Renda Disponible condiciona l'esperança de vida, l'abstencionisme o l’accés a l'educació.</b><br><br>Una <strong>Renda Municipal</strong> per a totes les families sota el llindar de la pobresa que garanteixi que arribin a un mínim de 600€ evitaria una distribució de la renda tan desigual com la que el mapa mostra.<br><br>Més encara si hi afegiu les taxes d'atur o l'esperança de vida de cada zona.");
                $("#textintro").css("opacity", "1");
                $("#textintro").html("Font 1a col.: Grup d'anàlisi de dades, BComú 2015.<br>Fem servir com indicador la Renda familiar disponible per càpita (2013).");
                PreparaAnys();
            }
        }
    });
    /***** Fi Select llista 01 *****/

    /***** Select llista 02 *****/
    $('#select_percent').ddslick({
        data: ddData_2,
        width: 133,
        selectText: "Escull el 2n paràmetre",
        onSelected: function(data) {
            var triat = data.selectedData.value;
            if (triat == 1) {
                file = "dades/percent_abstencio.csv";
                nom_col2 = "ABSTENCIÓ";
                esperansa = false;
                $("#titol2").text(" / Abstenció (2011)");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("Font 2a col.: <a href='http://www.bcn.cat/estadistica/catala/dades/inf/ele/ele27/A14.htm' target='_new' class='font'>Ajuntament de Barcelona</a>");
            } else if (triat == 2) {
                file = "dades/percent_sense_estudis_2.csv";
                nom_col2 = "POBLACIÓ SENSE ESTUDIS";
                esperansa = false;
                $("#titol2").text(" / Població sense estudis");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("Font 2a col.: <a href='http://opendata.bcn.cat/opendata/ca/catalog/POBLACIO#' target='_new' class='font'>Open Data Ajuntament de Barcelona</a><br>Percentatge de població sense estudis sobre la població de cada barri.");
            } else if (triat == 3) {
                file = "dades/allotjament_turistic.csv";
                nom_col2 = "PRESSIÓ TURÍSTICA";
                esperansa = false;
                $("#titol2").text(" / Índex de pressió turística");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("Font 2a col.: Grup d'anàlisi de dades, BComú 2015<br>Ens imaginem que totes les places s'ocupen -a l'agost per exemple- i calculem de cada 100 persones residents, quants serien turistes?");
            } else if (triat == 4) {
                file = "dades/pirmi2013_pastis.csv";
                nom_col2 = "BENEFICIARIS DEL PIRMI";
                esperansa = false;
                $("#titol2").text(" / Beneficiaris del Pirmi (2013)");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("Font 2a col.: Per districtes, beneficiaris del PIRMI. Dades per districtes.");
            } else if (triat == 5) {
                file = "dades/cobertura_sanitaria_publica_pastis.csv";
                nom_col2 = "COBERTURA SANITÀRIA PUBLICA";
                esperansa = false;
                $("#titol2").text(" / Cobertura sanitària publica");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("Font 2a col.: Consorci Sanitari de Barcelona.<br>InfoABS, ús de serveis sanitaris (SISalut). Dades per districtes.");
            } else if (triat == 6) {
                file = "dades/cobertura_sanitaria_privada_pastis.csv";
                nom_col2 = "COBERTURA SANITÀRIA PRIVADA";
                esperansa = false;
                $("#titol2").text(" / Cobertura sanitària privada");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("Font 2a col.: <a href='http://www.aspb.cat/quefem/sisalutinfoabs/SISalutLlibresIndicadors/InfoABS_UsServeisSanitaris_2013.html' target='_new' class='font'>Consorci Sanitari de Barcelona.<br>InfoABS, ús de serveis sanitaris (SISalut)</a><br>Percentatge de persones amb cobertura sanitària mixta-privada. Dades per districtes.");
            } else if (triat == 7) {
                file = "dades/atur2014_pastis.csv";
                nom_col2 = "ATUR REGISTRAT (2014)";
                esperansa = false;
                $("#titol2").text(" / Atur registrat");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("Font 2a col.: <a href='http://opendata.bcn.cat/opendata/ca/catalog/OCUPACIO/aturevopercent/' target='_new' class='font'>Open Data Ajuntament BCN</a>. Percentatge d'atur registrat al gener de 2014");
            } else if (triat == 8) {
                file = "dades/esperansa_vida_anys_dif.csv";
                nom_col2 = "ESPERANÇA DE VIDA";
                esperansa = true;
                $("#titol2").text(" / Esperança de vida per districtes");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("Font 2a col.: Diferència en anys amb el districte amb major esperança de vida. <a href='http://www.aspb.cat/quefem/sisalut/SISalutLlibresIndicadors/MORTALITAT_Barcelona100211_113808210_sis_Pag7.html' target='_new' class='font'>Consorci Sanitari de Barcelona</a>, Agència de Salut pública (2011). Dades per districtes.");
            } else if (triat == 9) {
                file = "dades/esborra0.csv";
                nom_col2 = "BUIDA";
                esperansa = false;
                $("#titol2").text(" ");
                pieData_modal.length = 0;
                handleFileSelect_pastissos(file);
                $("#textintro_col2").css("opacity", "1");
                $("#textintro_col2").html("");
            }
        }
    });
});
/***** Fi Select llista 02 *****/
