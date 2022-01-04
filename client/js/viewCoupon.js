
$(document).ready(() => {

    const deleteRendererComponent = (params) => {

        var btn = document.createElement("button");
        btn.innerHTML = "Delete Coupon";
        btn.id="btnDelete"
        // btn.setAttribute( "tourId", tourId );
        btn.onclick = function (e) {
          $.ajax({
            async: true,
            type: "DELETE",
            url: 'http://localhost:3001/tours/deleteCoupun/' + localStorage.getItem("tourId")+'/'+params.data.codeCoupon,
            success: function (data) {
                alert("coupon removed successfully")
                window.location.reload();
      
            },
            error: function (errorThrown) {
              alert("failed to delete coupon ");
      
            }
          })
        };
        return btn;
      
      }
    var tourId=localStorage.getItem("tourId");
        $.ajax({
            async: true,
            type: "GET",
            url: 'http://localhost:3001/tours/' + tourId,
            success: function (data) {
          
                if(data[0].coupons.length==0)
                {
                    alert("there is no coupon for tour "+localStorage.getItem("tourId"))
                    window.location.href="/toursList"
                }
                var coupons=data[0].coupons;
               
         
                var columnDefs = [
                    { field: 'codeCoupon' },
                    { field: 'startDate' },
                    { field: 'expiryDate' },
                    { field: 'discountPercentage' },
                    { field: "Delete",
                        cellRenderer: deleteRendererComponent,
                        cellRendererParams: {
                            // pass the field value here
                        }
                    }
                ];
                var gridOptions = {
                    columnDefs: columnDefs,
                    defaultColDef: {
                        width: 170,
                   
                    },
                };
                var gridDiv = document.querySelector('#myGrid');
                new agGrid.Grid(gridDiv, gridOptions);     
                    gridOptions.api.setRowData(coupons);
          
          
                },
                error: function (errorThrown) {
                    alert("failed to delete tour ");
    
                }
    
        })
    });