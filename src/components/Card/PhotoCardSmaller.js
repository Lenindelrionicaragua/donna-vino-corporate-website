"use client";

import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const VARIANT_CLASSES = {
  variant1: "bg-secondary-normal text-secondary-light",
  variant2: "bg-tertiary1-hover text-tertiary1-darker",
};

const PhotoCardSmaller = ({
  imageUrl,
  title,
  description,
  buttonIcon,
  buttonLabel,
  buttonVariant,
  buttonTestId,
  cardVariant,
}) => {
  const variantClass = VARIANT_CLASSES[cardVariant] || VARIANT_CLASSES.variant1; // Default to variant1

  return (
    <div
      className={`relative flex flex-col rounded-[2rem] w-full h-[32.125rem] sm:h-[28.5rem] sm:flex-row items-center ${variantClass}`}
      data-testid="photo-card-smaller"
      aria-labelledby="photo-card-title"
      aria-describedby="photo-card-description"
    >
      <figure
        className={`overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] sm:rounded-tr-none sm:rounded-tl-[2rem] sm:rounded-bl-[2rem]`}
        data-testid="photo-card-image"
        aria-labelledby="photo-card-title"
      >
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-[21.25rem] h-[12.375rem] sm:w-[25.75rem] sm:h-[28.5rem]"
          data-testid="card-image"
          aria-label={`Image representing ${title}`}
        />
      </figure>

      <div
        className="flex flex-col w-[18.5rem] sm:h-[28.5rem] gap-8 sm:p-6 sm:py-8 justify-center h-[19.75rem]"
        data-testid="photo-card-content"
      >
        <h3
          className="text-displaySmall font-barlow font-medium"
          id="photo-card-title"
          data-testid="photo-card-title"
          aria-label={`Card title: ${title}`}
        >
          {title}
        </h3>
        <p
          className="relative font-barlow text-bodyLarge sm:text-bodyMedium"
          id="photo-card-description"
          data-testid="photo-card-description"
          aria-label={`Card description: ${description}`}
        >
          {description}
        </p>
        <div className="flex justify-center items-center">
          <Button
            text={buttonLabel}
            icon={buttonIcon}
            variant={buttonVariant}
            testId={buttonTestId}
            ariaLabel={buttonLabel}
          />
        </div>
      </div>
    </div>
  );
};

PhotoCardSmaller.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string,
  buttonLabel: PropTypes.string.isRequired,
  buttonVariant: PropTypes.string.isRequired,
  buttonTestId: PropTypes.string.isRequired,
  cardVariant: PropTypes.oneOf(["variant1", "variant2"]),
};

PhotoCardSmaller.defaultProps = {
  buttonIcon: null,
  cardVariant: "variant1",
};

export default PhotoCardSmaller;
