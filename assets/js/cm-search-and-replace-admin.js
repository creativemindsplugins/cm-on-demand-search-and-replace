(function ($) {

    $(document).ready(function () {
		
		$('body').on( 'change', '.cmodsar_custom_postpage_new', function () {
			var that = $(this);
			if(that.val() == 'terms') {
				that.closest('.cmodsar_location_input').find('select.cmodsar_custom_postpage_new_multiple').val(null).trigger('change');
				that.closest('.cmodsar_location_input').find('select.cmodsar_custom_postpage_new_multiple').next('.select2-container').css('display', 'none');
				that.closest('.cmodsar_location_input').find('select.cmodsar_custom_cats_new_multiple').next('.select2-container').css('display', 'inline-block');
			} else {
				that.closest('.cmodsar_location_input').find('select.cmodsar_custom_cats_new_multiple').val(null).trigger('change');
				that.closest('.cmodsar_location_input').find('select.cmodsar_custom_cats_new_multiple').next('.select2-container').css('display', 'none');
				that.closest('.cmodsar_location_input').find('select.cmodsar_custom_postpage_new_multiple').next('.select2-container').css('display', 'inline-block');
			}
		});
		
		$( 'select.cmodsar_custom_postpage_new_multiple' ).select2( {
            width: 165,
            placeholder: "Select posts/pages",
            allowClear: true
        } );
		
		$( 'select.cmodsar_custom_cats_new_multiple' ).select2( {
            width: 165,
            placeholder: "Select categories",
            allowClear: true
        } );
		$('select.cmodsar_custom_cats_new_multiple').next('.select2-container').hide();
			
        /*
         * CUSTOM REPLACEMENTS
         */

        var datepicker_options = typeof window.cmodsar_data.datepicker_options !== 'undefined' ? window.cmodsar_data.datepicker_options : {};
        $('input.datepicker:visible').datetimepicker(datepicker_options);

        $(document).on('click', '#cmodsar-custom-add-replacement-btn', function () {
            var data, replace_from, replace_to, replace_case, replace_regex, replace_pause, replace_title, replace_content, replace_excerpt, replace_comments, replace_time_from, replace_time_to, valid = true;
			
			form_nonce = $('.cmodsar-custom-replacement-add').closest('form').find("#_wpnonce");

            replace_from = $('.cmodsar-custom-replacement-add textarea[name="cmodsar_custom_from_new"]');
            replace_to = $('.cmodsar-custom-replacement-add textarea[name="cmodsar_custom_to_new"]');
            replace_case = $('.cmodsar-custom-replacement-add input[name="cmodsar_custom_case_new"]');
            replace_regex = $('.cmodsar-custom-replacement-add input[name="cmodsar_custom_regex_new"]');

            replace_pause = $('.cmodsar-custom-replacement-add input[name="cmodsar_custom_pause_new"]');

            replace_title = $('.cmodsar-custom-replacement-add input[name="cmodsar_custom_title_new"]');
            replace_content = $('.cmodsar-custom-replacement-add input[name="cmodsar_custom_content_new"]');
            replace_excerpt = $('.cmodsar-custom-replacement-add input[name="cmodsar_custom_excerpt_new"]');
            replace_comments = $('.cmodsar-custom-replacement-add input[name="cmodsar_custom_comments_new"]');

            replace_time_from = $('.cmodsar-custom-replacement-add input[name*="custom_time_from"]:enabled');
            replace_time_to = $('.cmodsar-custom-replacement-add input[name*="custom_time_to"]:enabled');
			
			if (form_nonce.val() === '') {
                replace_from.addClass('invalid');
                valid = false;
            } else {
				replace_from.removeClass('invalid');
			}

            if (replace_from.val() === '') {
                replace_from.addClass('invalid');
                valid = false;
            }
            else {
                replace_from.removeClass('invalid');
            }

            /*
			if (replace_to.val() === '') {
                replace_to.addClass('invalid');
                valid = false;
            } else {
                replace_to.removeClass('invalid');
            }
			*/

            if (!valid) {
                return false;
            }

            data = {
                action: 'cmodsar_add_replacement',
                nonce: form_nonce.val(),
                replace_from: replace_from.val(),
                replace_to: replace_to.val(),
                replace_case: replace_case.is(':checked') ? 1 : 0,
                replace_regex: replace_regex.is(':checked') ? 1 : 0,
                replace_pause: replace_pause.is(':checked') ? 1 : 0,
                replace_title: replace_title.is(':checked') ? 1 : 0,
                replace_content: replace_content.is(':checked') ? 1 : 0,
                replace_excerpt: replace_excerpt.is(':checked') ? 1 : 0,
                replace_comments: replace_comments.is(':checked') ? 1 : 0,
                replace_time_from: $(replace_time_from).map(function () {
                    return $(this).val();
                }).get(),
                replace_time_to: $(replace_time_to).map(function () {
                    return $(this).val();
                }).get()
            };

            $('.custom_loading').fadeIn('fast');

            $.post(window.cmodsar_data.ajaxurl, data, function (response) {
                $('.cmodsar-wrapper-new-old').html(response);
                $('.custom_loading').fadeOut('fast');

                replace_from.val('');
                replace_to.val('');
                replace_case.prop('checked', false);
                replace_regex.val('');
                replace_pause.val('');

                replace_title.val('');
                replace_content.val('');
                replace_excerpt.val('');
                replace_comments.val('');

                replace_time_from.closest('tr').find('.cmodsar-custom-delete-restriction').trigger('click', [{"silent": true}]);

                $('input.datepicker:visible').datetimepicker(datepicker_options);

                $('div.cmodsar_place_disable_wrapper input[type="checkbox"]').trigger('cmodsar_checkCounts');
				
				$( 'select.cmodsar_custom_postpage_new_multiple' ).select2( {
					width: 165,
					placeholder: "Select posts/pages",
					allowClear: true
				} );
				
				$( 'select.cmodsar_custom_cats_new_multiple' ).select2( {
					width: 165,
					placeholder: "Select categories",
					allowClear: true
				} );
				$('select.cmodsar_custom_cats_new_multiple').next('.select2-container').hide();
				
				location.reload();
		
            });
        });

        $(document).on('click', '.cmodsar-custom-delete-restriction', function (e, attr) {
            if (typeof attr !== 'undefined' && attr.silent) {
                var parentRow = $(this).closest('tr').remove();
            } else {
                if (window.window.confirm('Do you really want to delete this restriction row?')) {
                    var parentRow = $(this).closest('tr').remove();
                }
            }
        });

        $(document).on('click', '.cmodsar-custom-time-restriction-add-new', function () {
            var parentTable = $(this).closest('td.cmodsar_time_input').find('.cmodsar_time_restriction_wrapper table tbody');
            var newRow = parentTable.find('tr.to-copy').clone();
            newRow.removeClass('to-copy').show().find('input').attr('disabled', false);
            parentTable.append(newRow);
            parentTable.find('input.datepicker:visible').datetimepicker(datepicker_options);
        });

        $(document).on('click', '.cmodsar-custom-place-restriction-add-new', function () {
            var exclusionList = $(this).siblings('div.cmodsar_place_disable_wrapper');
            exclusionList.toggle('fast');
        });

        var checkExclusionCounts = function () {
            var button = $(this).closest('div.cmodsar_place_disable_wrapper').siblings('.cmodsar-custom-place-restriction-add-new');
            var checkboxes = $(this).closest('div.cmodsar_place_disable_wrapper').find('input[type="checkbox"]').length;
            var checkboxesChecked = $(this).closest('div.cmodsar_place_disable_wrapper').find('input[type="checkbox"]:checked').length;

            button.val('Add Exclusion ('+checkboxesChecked+'/'+checkboxes+')');
        };

        $(document).on('change', 'div.cmodsar_place_disable_wrapper input[type="checkbox"]', checkExclusionCounts);

        $(document).on('cmodsar_checkCounts', 'div.cmodsar_place_disable_wrapper input[type="checkbox"]', checkExclusionCounts);
        $('div.cmodsar_place_disable_wrapper input[type="checkbox"]').trigger('cmodsar_checkCounts');

        $(document).on('click', '.cmodsar-custom-delete-replacement', function () {
			
			form_nonce = $('.cmodsar_replacements_list').closest('form').find("#_wpnonce");

            if (window.window.confirm('Do you really want to delete this replacement?')) {
                var data = {
                    action: 'cmodsar_delete_replacement',
					nonce: form_nonce.val(),
                    id: $(this).data('rid')
                };
                $('.custom_loading').fadeIn('fast');
                $.post(window.cmodsar_data.ajaxurl, data, function (response) {
                    $('.cmodsar-wrapper-new-old').html(response);
                    $('.custom_loading').fadeOut('fast');
                    $('div.cmodsar_place_disable_wrapper input[type="checkbox"]').trigger('cmodsar_checkCounts');
					
					$( 'select.cmodsar_custom_postpage_new_multiple' ).select2( {
						width: 165,
						placeholder: "Select posts/pages",
						allowClear: true
					} );
					
					$( 'select.cmodsar_custom_cats_new_multiple' ).select2( {
						width: 165,
						placeholder: "Select categories",
						allowClear: true
					} );
					$('select.cmodsar_custom_cats_new_multiple').next('.select2-container').hide();
					
					location.reload();
					
                });
            } else {
                $('.custom_loading').fadeOut('fast');
            }
        });

        $(document).on('click', '.cmodsar-custom-update-replacement', function () {
            if (window.window.confirm('Do you really want to update this replacement?')) {

                var data, id, replace_from, replace_to, replace_case, replace_regex, replace_pause, replace_title, replace_content, replace_excerpt, replace_comments, replace_time_from, replace_time_to, valid = true;

                id = $(this).data('uid');

				form_nonce = $('.cmodsar_replacements_list').closest('form').find("#_wpnonce");

                replace_from = $('.cmodsar_replacements_list textarea[name="cmodsar_custom_from[' + id + ']"]');
                replace_to = $('.cmodsar_replacements_list textarea[name="cmodsar_custom_to[' + id + ']"]');
                replace_case = $('.cmodsar_replacements_list input[name="cmodsar_custom_case[' + id + ']"]');
                replace_regex = $('.cmodsar_replacements_list input[name="cmodsar_custom_regex[' + id + ']"]');

                replace_pause = $('.cmodsar_replacements_list input[name="cmodsar_custom_pause[' + id + ']"]');

                replace_title = $('.cmodsar_replacements_list input[name="cmodsar_custom_title[' + id + ']"]');
                replace_content = $('.cmodsar_replacements_list input[name="cmodsar_custom_content[' + id + ']"]');
                replace_excerpt = $('.cmodsar_replacements_list input[name="cmodsar_custom_excerpt[' + id + ']"]');
                replace_comments = $('.cmodsar_replacements_list input[name="cmodsar_custom_comments[' + id + ']"]');

                replace_time_from = $('.cmodsar_replacements_list input[name*="custom_time_from[' + id + ']"]:enabled');
                replace_time_to = $('.cmodsar_replacements_list input[name*="custom_time_to[' + id + ']"]:enabled');
				
				if (form_nonce.val() === '') {
					replace_from.addClass('invalid');
					valid = false;
				} else {
					replace_from.removeClass('invalid');
				}

                if (replace_from.val() === '') {
                    replace_from.addClass('invalid');
                    valid = false;
                }
                else {
                    replace_from.removeClass('invalid');
                }

                /*
				if (replace_to.val() === '') {
                    replace_to.addClass('invalid');
                    valid = false;
                } else {
                    replace_to.removeClass('invalid');
                }
				*/

                if (!valid) {
                    return false;
                }

                data = {
                    action: 'cmodsar_update_replacement',
					nonce: form_nonce.val(),
                    replace_id: $(this).data('uid'),
                    replace_from: replace_from.val(),
                    replace_to: replace_to.val(),
                    replace_case: replace_case.is(':checked') ? 1 : 0,
                    replace_regex: replace_regex.is(':checked') ? 1 : 0,
                    replace_pause: replace_pause.is(':checked') ? 1 : 0,
                    replace_title: replace_title.is(':checked') ? 1 : 0,
                    replace_content: replace_content.is(':checked') ? 1 : 0,
                    replace_excerpt: replace_excerpt.is(':checked') ? 1 : 0,
                    replace_comments: replace_comments.is(':checked') ? 1 : 0,
                    replace_time_from: $(replace_time_from).map(function () {
                        return $(this).val();
                    }).get(),
                    replace_time_to: $(replace_time_to).map(function () {
                        return $(this).val();
                    }).get()
                };
                $('.custom_loading').fadeIn('fast');
                $.post(window.cmodsar_data.ajaxurl, data, function (response) {
                    $('.cmodsar-wrapper-new-old').html(response);
                    $('.custom_loading').fadeOut('fast');

                    $('input.datepicker:visible').datetimepicker(datepicker_options);
                    $('div.cmodsar_place_disable_wrapper input[type="checkbox"]').trigger('cmodsar_checkCounts');
					
					$( 'select.cmodsar_custom_postpage_new_multiple' ).select2( {
						width: 165,
						placeholder: "Select posts/pages",
						allowClear: true
					} );
					
					$( 'select.cmodsar_custom_cats_new_multiple' ).select2( {
						width: 165,
						placeholder: "Select categories",
						allowClear: true
					} );
					$('select.cmodsar_custom_cats_new_multiple').next('.select2-container').hide();
				
                });
            } else {
                $('.custom_loading').fadeOut('fast');
            }
        });

        /*
         * RELATED ARTICLES
         */
        $.fn.add_new_replacement_row = function () {
            var articleRow, articleRowHtml, rowId;

            rowId = $(".custom-related-article").length;
            articleRow = $('<div class="custom-related-article"></div>');
            articleRowHtml = $('<input type="text" name="custom_related_article_name[]" style="width: 40%" id="custom_related_article_name" value="" placeholder="Name"><input type="text" name="custom_related_article_url[]" style="width: 50%" id="custom_related_article_url" value="" placeholder="http://"><a href="#javascript" class="custom_related_article_remove">Remove</a>');
            articleRow.append(articleRowHtml);
            articleRow.attr('id', 'custom-related-article-' + rowId);

            $("#custom-related-article-list").append(articleRow);
            return false;
        };

        $.fn.delete_replacement_row = function (row_id) {
            $("#custom-related-article-" + row_id).remove();
            return false;
        };

        /*
         * Added in 2.7.7 remove replacement_row
         */
        $(document).on('click', 'a.custom_related_article_remove', function () {
            var $this = $(this), $parent;
            $parent = $this.parents('.custom-related-article').remove();
            return false;
        });

        /*
         * Added in 2.4.9 (shows/hides the explanations to the variations/synonyms/abbreviations)
         */
        $(document).on('click showHideInit', '.cm-showhide-handle', function () {
            var $this = $(this), $parent, $content;
            $parent = $this.parent();
            $content = $this.siblings('.cm-showhide-content');
            if (!$parent.hasClass('closed')) {
                $content.hide();
                $parent.addClass('closed');
            } else {
                $content.show();
                $parent.removeClass('closed');
            }
        });

        $('.cm-showhide-handle').trigger('showHideInit');

        /*
         * CUSTOM REPLACEMENTS - END
         */

        if ($.fn.tabs) {
            $('#cmodsar_tabs').tabs({
                activate: function (event, ui) {
                    window.location.hash = ui.newPanel.attr('id').replace(/-/g, '_');
                },
                create: function (event, ui) {
                    var tab = location.hash.replace(/\_/g, '-');
                    var tabContainer = $(ui.panel.context).find('a[href="' + tab + '"]');
                    if (typeof tabContainer !== 'undefined' && tabContainer.length) {
                        var index = tabContainer.parent().index();
                        $(ui.panel.context).tabs('option', 'active', index);
                    }
                }
            });
        }

        $('.cmodsar_field_help_container').each(function () {
            var newElement, element = $(this);
            newElement = $('<div class="cmodsar_field_help"></div>');
            newElement.attr('title', element.html());
            if (element.siblings('th').length) {
                element.siblings('th').append(newElement);
            } else {
                element.siblings('*').append(newElement);
            }
            element.remove();
        });

        $('.cmodsar_field_help').tooltip({
            show: {
                effect: "slideDown",
                delay: 100
            },
            position: {
                my: "left top",
                at: "right top"
            },
            content: function () {
                var element = $(this);
                return element.attr('title');
            },
            close: function (event, ui) {
                ui.tooltip.hover(
					function () {
						$(this).stop(true).fadeTo(400, 1);
					},
					function () {
						$(this).fadeOut("400", function () {
							$(this).remove();
						});
					});
            }
        });
		
		$(document).on('click', '.cmodsar_addrule', function () {
			var that = $(this);
			if(that.next().find('.cmodsar-custom-replacement-add').hasClass('hide') == true) {
				that.next().find('.cmodsar-custom-replacement-add').slideDown(500).removeClass('hide').addClass('show');
			} else {
				that.next().find('.cmodsar-custom-replacement-add').slideUp(500, function () {
					that.next().find('.cmodsar-custom-replacement-add').removeClass('show').addClass('hide');
				});
			}
		});
		
		$(document).on('click', '.cmodsar_expand_collapse_btn', function () {
			var that = $(this);
			var collapse_text = 'Collapse Additional Settings (&#8593;)';
			var expand_text = 'Expand Additional Settings (&#8595;)';
			if(that.closest('.cmodsar-wrapper-row').find('.cmodsar_expand_collapse').hasClass('hide') == true) {
				that.closest('.cmodsar-wrapper-row').find('.cmodsar_expand_collapse').slideDown(500).removeClass('hide').addClass('show');
				that.html(collapse_text);
			} else {
				that.closest('.cmodsar-wrapper-row').find('.cmodsar_expand_collapse').slideUp(500, function () {
					that.closest('.cmodsar-wrapper-row').find('.cmodsar_expand_collapse').removeClass('show').addClass('hide');
					that.html(expand_text);
				});
			}
		});
		
		$(document).on('change', '.select_posts_pages_categories_tags', function () {
			var that = $(this);
			if(that.val() == 'include' || that.val() == 'exclude') {
				$('.select_categories_tags').hide();
				$('.select_posts_pages').show();
			} else if(that.val() == 'categories_tags') {
				$('.select_posts_pages').hide();
				$('.select_categories_tags').show();
			} else if(that.val() == 'all') {
				$('.select_posts_pages').hide();
				$('.select_categories_tags').hide();
			} else {
				$('.select_posts_pages').hide();
				$('.select_categories_tags').hide();
			}
		});
				
		$('.cmodsar_help').tooltip({
            show: {
                effect: "slideDown",
                delay: 100
            },
            position: {
                my: "left top",
                at: "right top"
            },
            content: function () {
                var element = $( this );
                return element.attr( 'title' );
            },
            close: function ( event, ui ) {
                ui.tooltip.hover(
                    function () {
                        $( this ).stop( true ).fadeTo( 400, 1 );
                    },
                    function () {
                        $( this ).fadeOut( "400", function () {
                            $( this ).remove();
                        } );
                    } );
            }
        });
		
    });
	
	$(window).load(function () {
		var tab = location.hash.replace(/\_/g, '-');
		$('#cmodsar_tabs').find('a[href="' + tab + '"]').trigger('click');
	});

})(jQuery);