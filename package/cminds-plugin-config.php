<?php
ob_start();
include plugin_dir_path(__FILE__) . 'views/plugin_compare_table.php';
$plugin_compare_table = ob_get_contents();
ob_end_clean();
$cminds_plugin_config = array(
	'plugin-is-pro'						=> false,
	'plugin-version'					=> '1.4.6',
	'plugin-abbrev'						=> 'cmodsar',
	'plugin-short-slug'					=> 'search-and-replace',
	'plugin-parent-short-slug'			=> '',
	'plugin-file'						=> CMODSAR_PLUGIN_FILE,
    'plugin-campign'					=> '?utm_source=searchreplacefree&utm_campaign=freeupgrade',
    'plugin-affiliate'					=> '',
    'plugin-redirect-after-install'		=> admin_url( 'admin.php?page=cmodsar_settings' ),
    'plugin-show-guide'					=> TRUE,
	'plugin-upgrade-text'				=> 'Good Reasons to Upgrade to Pro',
    'plugin-upgrade-text-list'			=> array(
        array( 'title' => 'Introduction to the search and replace plugin', 'video_time' => '0:00' ),
        array( 'title' => 'Use in titles, comments and excerpts', 'video_time' => '0:58' ),
        array( 'title' => 'Time restricted search and replace', 'video_time' => '1:18' ),
        array( 'title' => 'Exclude specific pages', 'video_time' => '1:30' ),
        array( 'title' => 'Regex support', 'video_time' => 'More' ),
        array( 'title' => 'Import and export rules', 'video_time' => 'More' ),
        array( 'title' => 'ACF support', 'video_time' => 'More' ),
        array( 'title' => 'More support to Yoast and WooCommerce content', 'video_time' => 'More' ),
    ),
    'plugin-upgrade-video-height'		=> 240,
    'plugin-upgrade-videos'				=> array(
        array( 'title' => 'Search and Replace Premium Features', 'video_id' => '124893784' ),
    ),
    'plugin-guide-text'					=> '<div style="display:block">
        <ol>
         <li>This plugin allows you to setup the search & replace rules for the content of your site.</li>
        <li>You can set a <strong>textual string or HTML</strong> which should be found and the string/HTML that should be placed instead.</li>
        <li> You may also decide only to remove without replacing it (just leave the "To String" empty).</li>
        <li>This plugin and replacment tules <strong>does not change the content on the database</strong>. Instead it changes the content right before it is displayed.</li>
        <li><strong>Example:</strong>Create a rule, in the From String field type: "test" in the To String field: "passed"</li>
        <li>Create a new page, add some title (any), and write the "test" in the content</li>
        <li>Save the page and view it</li>
        <li>You should see the string "passed" in the content</li>
        <li>If there is still "test" displayed - it may mean that your theme is not using "the_content" filter.</li>
        </ol>
    </div>',
    'plugin-guide-video-height'          => 240,
    'plugin-guide-videos'            => array(
        array( 'title' => 'Installation tutorial', 'video_id' => '157541752' ),
    ),
	'plugin-dir-path'			 => plugin_dir_path( CMODSAR_PLUGIN_FILE ),
	'plugin-dir-url'			 => plugin_dir_url( CMODSAR_PLUGIN_FILE ),
	'plugin-basename'			 => plugin_basename( CMODSAR_PLUGIN_FILE ),
	'plugin-icon'				 => '',
	'plugin-name'				 => CMODSAR_NAME,
	'plugin-license-name'		 => CMODSAR_CANONICAL_NAME,
	'plugin-slug'				 => '',
	'plugin-menu-item'			 => CMODSAR_SETTINGS_OPTION,
	'plugin-textdomain'			 => CMODSAR_SLUG_NAME,
	'plugin-userguide-key'		 => '2244-cm-search-and-replace-cmsr-free-version-guide',
	'plugin-store-url'			 => 'https://www.cminds.com/wordpress-plugins-library/purchase-cm-on-demand-search-and-replace-plugin-for-wordpress?utm_source=searchreplacefree&utm_campaign=freeupgrade&upgrade=1',
	'plugin-support-url'		 => 'https://www.cminds.com/contact/',
	'plugin-review-url'			 => 'https://wordpress.org/support/view/plugin-reviews/cm-on-demand-search-and-replace',
	'plugin-changelog-url'		 => CMODSAR_RELEASE_NOTES,
	'plugin-licensing-aliases'	 => array( CMODSAR_LICENSE_NAME ),
	'plugin-compare-table'	 => $plugin_compare_table,
);