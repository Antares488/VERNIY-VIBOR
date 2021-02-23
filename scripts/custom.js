$(".title").click(function(e) {
    $(".title").removeClass('active');
    $(this).addClass('active');

    $('.container').removeClass('block-active');
    $($(this).attr('data-class')).addClass('block-active');
})
$(function(){
    $('#pr_form').submit(function(e){
        e.preventDefault(); //отменяем стандартное действие при отправке формы
        var m_method=$(this).attr('method'); //берем из формы метод передачи данных
        var m_action=$(this).attr('action'); //получаем адрес скрипта на сервере, куда нужно отправить форму
        var m_data=$(this).serialize(); //получаем данные, введенные пользователем в формате input1=value1&input2=value2...,то есть в стандартном формате передачи данных формы
        $.ajax({
            type: m_method,
            url: m_action,
            data: m_data,
            success: function(result){
                $('#result_form').html(result);
            }
        });
    });
});

jQuery.fn.chained = function(parent_selector, options) {
    return this.each(function() {
        var self = this;                                        /* Save this to self because this changes when scope changes. */
        var backup = jQuery(self).clone();
        jQuery(parent_selector).each(function() {               /* Handles maximum two parents now. */
            jQuery(this).bind("change", function() {
                jQuery(self).html(backup.html());
                var selected = "";                                      /* If multiple parents build classname like foo\bar. */
                jQuery(parent_selector).each(function() { selected += "\\" + jQuery(":selected", this).val(); });
                selected = selected.substr(1);                          /* Also check for first parent without subclassing. */ /* TODO: This should be dynamic and check for each parent */ /* without subclassing. */
                var first = jQuery(parent_selector).first();
                var selected_first = jQuery(":selected", first).val();
                jQuery("option", self).each(function() {
                    if (!jQuery(this).hasClass(selected) &&                 /* Remove unneeded items but save the default value. */
                        !jQuery(this).hasClass(selected_first) && jQuery(this).val() !== "") { jQuery(this).remove(); }
                });
                if (1 == jQuery("option", self).size() && jQuery(self).val() === "") { jQuery(self).attr("disabled", "disabled"); }  /* If we have only the default value disable select. */
                else { jQuery(self).removeAttr("disabled"); }
                jQuery(self).trigger("change");
            });
            if ( !jQuery("option:selected", this).length ) { jQuery("option", this).first().attr("selected", "selected");}       /* Force IE to see something selected on first page load, */ /* unless something is already selected */
            jQuery(this).trigger("change");                        /* Force updating the children. */
        }); }); };
jQuery.fn.chainedTo = jQuery.fn.chained;               /* Alias for those who like to use more English like syntax. */

//Запуск select-соответствий
jQuery(document).ready(function(){ jQuery("#proba").chained("#metal"); });