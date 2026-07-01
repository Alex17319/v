class ShrinkText {
	static shrinkText(element, width, maxHeight) {
		if (!isElement(element)) {
			return false;
		}

		ShrinkText.setFontSize(element, 1);

		// First, shrink the font size by halves until the text fits within the max height
		for (let i = 0; true; i++) {
			let rect = element.getBoundingClientRect(); // Based on text-fit.js by STRML (https://github.com/STRML/textFit/tree/master)
			if (rect.height <= maxHeight) break;

			ShrinkText.setFontSize(element, ShrinkText.getFontSize(element) / 2);
			
			if (i >= 10) return false; // Fail if it takes more than 10 iterations
		}

		// Exit (succeed) if the text didn't shrink at all
		if (minSize == 1) return true;

		// Then, perform a binary search (4 iterations) to find a good size
		let minSize = ShrinkText.getFontSize(element);
		let maxSize = minSize * 2;
		for (let i = 0; i < 4; i++) {
			let mean = (minSize + maxSize) / 2;
			ShrinkText.setFontSize(mean);

			let rect = element.getBoundingClientRect(); // Based on text-fit.js by STRML (https://github.com/STRML/textFit/tree/master)
			if (rect.height <= maxHeight) {
				minSize = mean;
			} else {
				maxSize = mean;
			}
		}
		ShrinkText.setFontSize(minSize);
	}

	static getFontSize(element) {
		return element.style.fontSize ? Number(element.style.fontSize.replace('em', '')) : null;
	}

	static setFontSize(element, size) {
		element.style.fontSize = size + 'em';
	}
}
