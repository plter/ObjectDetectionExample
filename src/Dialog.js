const Dialog = {
    showLoading(msg) {
        return $(`<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="modal-body">
        <p>${msg}</p>
      </div>
    </div>
  </div>
</div>`).modal({
            keyboard: false,
            backdrop: "static",
        }).appendTo(document.body).on("hide.bs.modal", function (e) {
            $(this).remove();
        });
    },

    showMessageDialog(msg, title = "", closeCallback, closeBtnClass = "btn-danger") {
        return $(`<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${msg}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn ${closeBtnClass}" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>`).modal({
            keyboard: true,
            backdrop: true,
        }).appendTo(document.body).on("hide.bs.modal", function (e) {
            $(this).remove();
            if (closeCallback) {
                closeCallback();
            }
        });
    },

    async showConfirmDialog(msg, title = "") {
        return new Promise(resolve => {
            let returned = false;
            let d = $(`<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${msg}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary btn-confirm">确定</button>
      </div>
    </div>
  </div>
</div>`).modal({
                keyboard: true,
                backdrop: true,
            }).appendTo(document.body);
            d.on("hide.bs.modal", function (e) {
                $(this).remove();
                if (!returned) {
                    returned = true;
                    resolve(false);
                }
            });
            d.find(".btn-confirm").click(function () {
                returned = true;
                resolve(true);
                d.modal("hide");
            });
        });
    }
};

export default Dialog;