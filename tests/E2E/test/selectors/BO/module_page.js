module.exports = {
  ModulePage: {
    modules_subtab: '#subtab-AdminParentModulesSf',
    upload_button: '//*[@id="page-header-desc-configuration-add_module"]',
    zip_file_input: '//*[@id="importDropzone"]/input',
    installed_message: '//*[@id="importDropzone"]/div[3]/p[1]',
    close_modal_button: '//*[@id="module-modal-import-closing-cross"]',
    search_input: 'div.pstaggerAddTagWrapper > input',
    search_button: '.btn.btn-primary.pull-right.search-button',
    page_loaded: '.module-search-result-wording',
    installed_modules_tabs: '(//div[@class="page-head-tabs"]/a)[2]',
    modules_search_input: '.pstaggerAddTagInput',
    module_selection_input: '//input[contains(@class,"pstaggerAddTagInput ")]',
    modules_search_button: '//*[@id="main-div"]//button[contains(@class,"search-button")]',
    configure_module_button: '//form[contains(@action, "action/configure/%moduleTechName")]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-configure"]',
    success_install_message: '//*[@id="importDropzone"]/div[3]/i',
    action_dropdown: '//div[@data-tech-name="%moduleTechName"]//button[contains(@class,"dropdown-toggle")]',
    uninstall_button: '//form[contains(@action, "action/uninstall/%moduleTechName")]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-uninstall"]',
    uninstall_confirmation: '//*[@id="module-modal-confirm-prestafraud-uninstall"]//a[contains(@class,"module_action_modal_uninstall")]',
    built_in_module_span: '//*[@id="built-in_modules"]',
    selection_search_button: '//*[@id="main-div"]//button[contains(@class,"search-button")]',
    install_button: '//*[@id="modules-list-container-all"]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-install"]',
    config_legend_adwords: '//*[@id="content"]//h4[contains(@class,"page-subtitle")]',
    uninstall_adwords_module: '//*[@id="module-modal-confirm-gadwords-uninstall"]//a[contains(@class,"module_action_modal_uninstall")]',
    more_option_button: '//*[@id="upgradeButtonBlock"]//input',
    channel_select: '//*[@id="advanced"]/select',
    archive_select: '//*[@id="for-useArchive"]//select',
    save_button: '//*[@id="advanced"]//input[contains(@class,"btn-primary")]',
    save_message: '//*[@id="configResult"]',
    version_number: '//*[@id="for-useArchive"]//input',
    upgrade_button: '//*[@id="upgradeNow"]',
    loader_tag: '//*[@id="pleaseWait" and contains(@style,"display: none;")]',
    upgrade_block: '//*[@id="upgradeButtonBlock"]',
    refresh_button: '//*[@id="upgradeButtonBlock"]/div/p[2]/a',
    module_import_success: '//*[@id="importDropzone"]/div[3]/p[1]',
    config_legend: '//*[@id="content"]//ul[contains(@class, "breadcrumb")]/li[text()="%moduleTechName"]',
    uninstall_module_modal: '//a[contains(@class,"module_action_modal_uninstall")]',
    disable_module: '//form[contains(@action, "action/disable/%moduleTechName")]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-disable"]',
    confirmation_disable_module: '(//a[contains(@class,"module_action_modal_disable")])[1]',
    module_autoUpgrade_menu: '//*[@id="subtab-AdminSelfUpgrade"]/a',
    rollback_selection: '//*[@id="restoreBackupContainer"]//select',
    rollback_version: '//*[@id="restoreBackupContainer"]//option[2]',
    rollback_button: '//*[@id="rollback"]',
    success_msg: '(//p[contains(@class,"alert-success")])[1]/p',
    module_list: '//*[@id="modules-list-container-all"]/div[%I]',
    sort_select: '//select[contains(@class,"sort-component")]',
    maintenance_shop: '//*[@id="currentConfiguration"]//input[contains(@name,"putUnderMaintenance")]',
    confirm_maintenance_shop_icon: '(//*[@id="currentConfiguration"]//img)[5]',
<<<<<<< HEAD
    enable_module: '(//button[contains(@class,"module_action_menu_enable")])[1]',
    reset_module: '//*[@id="modules-list-container-native"]//button[contains(@class, "module_action_menu_reset")]',
    reset_button: '//*[@id="module-modal-confirm-%moduleTechName-reset"]//a[contains(@class, "module_action_modal_reset")]',
=======
    enable_module: '//form[contains(@action, "action/enable/%moduleTechName")]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-enable"]',
    reset_module: '//form[contains(@action, "action/reset/%moduleTechName")]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-reset"]',
    reset_button_modal: '//*[@id="module-modal-confirm-%moduleTechName-reset"]//a[contains(@class, "module_action_modal_reset")]',
>>>>>>> upstream/1.7.3.x
    backdrop_modale:'//div[contains(@class, "fade show")]',
    installed_module_div: '//div[@data-tech-name="%moduleTechName"]',
    //List of modules after search
    list_module: '//*[@id="modules-list-container-all"]/div[%I]',
<<<<<<< HEAD
    modules_number: '[class="module-sorting-search-wording"]',
    discover_button: '//*[@id="modules-list-container-all"]/div[@data-tech-name="pm_advancedtopmenu"]//a[contains(text(),"Discover")]',
    //List of modules in notifications tab
    configure_module: '//*[@id="modules-list-container-notification"]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-configure"]',
    modules_number_to_configure: '//*[@id="module-short-list-configure"]/span[1]',
    notification_number: '//*[@id="head_tabs"]//span[@class="notification-counter"]',

    ModuleBankTransferPage: {
      account_owner_input: '//*[@id="BANK_WIRE_OWNER"]',
      account_details_textarea: '//*[@id="BANK_WIRE_DETAILS"]',
      bank_address_textarea: '//*[@id="BANK_WIRE_ADDRESS"]',
      save_button: '//*[@id="module_form_submit_btn"]'
    },

    //Module name in "addons.prestashop.com" after clicking on "Dicover" button
    module_name: '//*[@id="product_content"]/div[@class="product_head"]//h1'
=======
>>>>>>> upstream/1.7.3.x
  }
};
