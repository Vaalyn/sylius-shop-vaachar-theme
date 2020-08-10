(function($) {
	const handleProductOptionsChangeTaxes = function handleProductOptionsChangeTaxes() {
		$('[name*="sylius_add_to_cart[cartItem][variant]"]').on('change', () => {
			let selector = '';

			$('#sylius-product-adding-to-cart select[data-option]').each((index, element) => {
				const select = $(element);
				const option = select.find('option:selected').val();
				selector += `[data-${select.attr('data-option')}="${option}"]`;
			});

			const taxRate = $('#sylius-variants-pricing').find(selector).data('tax-rate');
			const taxesIncludedInPrice = $('#sylius-variants-pricing').find(selector).data('taxes-included-in-price');

			if (taxRate !== undefined) {
				if (taxRate === 0) {
					$('#product-taxes-text').addClass('hide');
					$('#product-taxes-text-german-small-business').removeClass('hide');
				} else {
					if (taxesIncludedInPrice === true) {
						$('#product-taxtes-excluded-from-price').addClass('hide');
						$('#product-taxtes-included-in-price').removeClass('hide');
					} else {
						$('#product-taxtes-included-in-price').addClass('hide');
						$('#product-taxtes-excluded-from-price').removeClass('hide');
					}

					$('#product-taxes-text-german-small-business').addClass('hide');
					$('#product-taxes-text').removeClass('hide');
					$('#product-tax-rate-percentage').text(taxRate * 100);
				}
			} else {
				$('#product-taxes-text-german-small-business').addClass('hide');
				$('#product-taxes-text').addClass('hide');
			}
		});
	};

	const handleProductVariantsChangeTaxes = function handleProductVariantsChangeTaxes() {
		$('[name="sylius_add_to_cart[cartItem][variant]"]').on('change', (event) => {
			const taxRate = $(event.currentTarget).parents('tr').find('.sylius-product-variant-price').data('tax-rate');
			const taxesIncludedInPrice = $(event.currentTarget).parents('tr').find('.sylius-product-variant-price').data('data-taxes-included-in-price');

			if (taxRate !== undefined) {
				if (taxRate === 0) {
					if (taxesIncludedInPrice === true) {
						$('#product-taxtes-excluded-from-price').addClass('hide');
						$('#product-taxtes-included-in-price').removeClass('hide');
					} else {
						$('#product-taxtes-included-in-price').addClass('hide');
						$('#product-taxtes-excluded-from-price').removeClass('hide');
					}

					$('#product-taxes-text').addClass('hide');
					$('#product-taxes-text-german-small-business').removeClass('hide');
				} else {
					$('#product-taxes-text-german-small-business').addClass('hide');
					$('#product-taxes-text').removeClass('hide');
					$('#product-tax-rate-percentage').text(taxRate * 100);
				}
			} else {
				$('#product-taxes-text-german-small-business').addClass('hide');
				$('#product-taxes-text').addClass('hide');
			}
		});
	};

	$.fn.extend({
		variantPricesTaxes() {
			if ($('#sylius-variants-pricing').length > 0) {
				handleProductOptionsChangeTaxes();
			} else if ($('#sylius-product-variants').length > 0) {
				handleProductVariantsChangeTaxes();
			}
		},
	});

	$(document).ready(() => {
		$(document).variantPricesTaxes();

		$('.ui.sidebar').sidebar('attach events', '#menu .item.sidebar-trigger');

		if (monsieurbizSearchPlugin.instantEnabled) {
			$('body').bind('click', function(e) {
				if(
					!$(e.target).is($(monsieurbizSearchPlugin.resultFindSelector))
					&& !$(e.target).closest($(monsieurbizSearchPlugin.resultFindSelector)).length
				) {
					$(monsieurbizSearchPlugin.resultFindSelector).hide();
				}
			});
		}
	});
})(jQuery);
