(function(window, document, $, undefined) {
        "use strict";
        $(function() {

                if ($('#chartjs_line').length) {
                    var ctx = document.getElementById('chartjs_line').getContext('2d');

                    var myChart = new Chart(ctx, {
                            type: 'line',

                            data: {
                                labels: ["PRA MUSRENBANG KEC", "MUSRENBANG KEC", "FORUM OPD", "MUSRENBANG KAB"],
                                datasets: [{
                                    label: 'Usulan',
                                    data:_allDataUsulan,

                                    backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                                    borderWidth: 2
                                }, {
                                    label: 'Diterima',
                                    data: _allDataDiterima,
                                    backgroundColor: "rgba(255, 64, 123,0.5)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                                    borderWidth: 2
                                },{
                                    label: 'Ditolak',
                                    data: _allDataDitolak,
                                    backgroundColor: "rgba(100, 64, 50)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                                    borderWidth: 2
                                }]

                            },
                            options: {
                                legend: {
                                    display: true,
                                    position: 'bottom',

                                    labels: {
                                        fontColor: '#71748d',
                                        fontFamily: 'Circular Std Book',
                                        fontSize: 14,
                                    }
                                },

                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            fontSize: 14,
                                            fontFamily: 'Circular Std Book',
                                            fontColor: '#71748d',
                                        }
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            fontSize: 14,
                                            fontFamily: 'Circular Std Book',
                                            fontColor: '#71748d',
                                        }
                                    }]
                                }
                            }
                        


                    });
            }
            if ($('#chartBatang').length) {
                var ctx = document.getElementById("chartBatang").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels:chart[0].judul,
                        datasets:chart[0].value
                    },
                    options: {
                        scales: {
                            yAxes: [{

                            }]
                        },
                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },

                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontFamily: 'Circular Std Book',
                                fontColor: '#71748d',
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontFamily: 'Circular Std Book',
                                fontColor: '#71748d',
                            }
                        }]
                    }
                }

                    
                });
            }

            if ($('#chartjs_radar').length) {
                var ctx = document.getElementById("chartjs_radar");
                var myChart = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ["M", "T", "W", "T", "F", "S", "S"],
                        datasets: [{
                            label: 'Almonds',
                           backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                            data: [12, 19, 3, 17, 28, 24, 7],
                            borderWidth: 2
                        }, {
                            label: 'Cashew',
                             backgroundColor: "rgba(255, 64, 123,0.5)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                            data: [30, 29, 5, 5, 20, 3, 10],
                            borderWidth: 2
                        }]
                    },
                    options: {
                       
                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },

                    
                }

                });
            }

            if ($('#chartjs_polar').length) {
                var ctx = document.getElementById("chartjs_polar").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'polarArea',
                    data: {
                        labels: ["kotak Kosong "+_$(_quickCount[0])+" suara ("+_persentase(_totalSuara,_quickCount[0])+"%)", "F3 "+_$(_quickCount[1])+" suara ("+_persentase(_totalSuara,_quickCount[1])+"%)", "Tidak Sah "+_$(_quickCount[2])+" suara ("+_persentase(_totalSuara,_quickCount[2])+"%)"],
                        datasets: [{
                            backgroundColor: [
                                "#212121",
                                "#ff6d00",
                                "#25d5f2",
                            ],
                            data: _quickCount
                        }]
                    },
                    options: {
                        
                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },

                    
                }
                });
            }


            if ($('#chartjs_pie').length) {
                var ctx = document.getElementById("chartjs_pie").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels:_namaKeterangan,
                        datasets: [{
                            backgroundColor: [
                               "#5969ff",
                                "#ff407b"
                            ],
                            data: [_totalMasuk, _totalSisa]
                        }]
                    },
                    options: {
                           legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },

                    
                }
                });
            }


            if ($('#chartjs_doughnut').length) {
                var ctx = document.getElementById("chartjs_doughnut").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ["PRA MUSRENBANG KEC", "MUSRENBANG KEC", "FORUM OPD","MUSRENBANG KAB"],
                        datasets: [{
                            backgroundColor: [
                                "#212121",
                                "#ff6d00",
                                "#25d5f2"
                            ],
                            data:_allUsulanDiterma,
                            
                        }]
                    },
                    options: {
                        legend: {
                            display: true,
                            position: 'bottom',
                                labels: {
                                    fontColor: '#71748d',
                                    fontFamily: 'Circular Std Book',
                                    fontSize: 14,
                                    text:"saass"
                                }
                        }
                }

                });
                // this.myChart.ctx.fillText("text", "textX", "textY");
            }


        });

})(window, document, window.jQuery);

function _persentase(total,totalMasuk){
    return parseFloat((Number(totalMasuk)/Number(total))*100).toFixed(2);
}