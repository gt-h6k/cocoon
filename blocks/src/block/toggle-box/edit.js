import { THEME_NAME, getDateID } from '../../helpers';
import { __ } from '@wordpress/i18n';
import {
  InspectorControls,
  InnerBlocks,
  RichText,
  withColors,
  PanelColorSettings,
  withFontSizes,
  useBlockProps,
} from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { compose, useInstanceId } from '@wordpress/compose';
import classnames from 'classnames';

export function ToggleBoxEdit( props ) {
  const {
    attributes,
    setAttributes,
    className,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor,
    borderColor,
    setBorderColor,
    fontSize,
  } = props;

  const {
    content,
    dateID,
    customBackgroundColor,
    customTextColor,
    customBorderColor,
    notNestedStyle,
  } = attributes;

  const classes = classnames( className, {
    'toggle-wrap': true,
    'toggle-box': true,
    'block-box': true,
    'has-text-color': textColor.color,
    'has-background': backgroundColor.color,
    'has-border-color': borderColor.color,
    [ backgroundColor.class ]: backgroundColor.class,
    [ textColor.class ]: textColor.class,
    [ borderColor.class ]: borderColor.class,
    [ fontSize.class ]: fontSize.class,
    'not-nested-style': notNestedStyle,
  } );

  const styles = {
    '--cocoon-custom-border-color': customBorderColor || undefined,
    '--cocoon-custom-background-color': customBackgroundColor || undefined,
    '--cocoon-custom-text-color': customTextColor || undefined,
  };

  const blockProps = useBlockProps( {
    className: classes,
    style: styles,
  } );

  const instanceId = useInstanceId( ToggleBoxEdit );
  useEffect( () => {
    setAttributes( { dateID: getDateID() + instanceId } );
  }, [ instanceId ] );

  return (
    <Fragment>
      <InspectorControls>
        <PanelColorSettings
          title={ __( '色設定', THEME_NAME ) }
          colorSettings={ [
            {
              label: __( 'ボーダー色', THEME_NAME ),
              onChange: setBorderColor,
              value: borderColor.color,
            },
            {
              label: __( '背景色', THEME_NAME ),
              onChange: setBackgroundColor,
              value: backgroundColor.color,
            },
            {
              label: __( '文字色', THEME_NAME ),
              onChange: setTextColor,
              value: textColor.color,
            },
          ] }
          __experimentalIsRenderedInSidebar={ true }
        />
      </InspectorControls>

      <div { ...blockProps }>
        <input
          id={ 'toggle-checkbox-' + dateID }
          className="toggle-checkbox"
          type="checkbox"
        />
        <label
          className="toggle-button"
          htmlFor={ 'toggle-checkbox-' + dateID }
        >
          <RichText
            value={ content }
            onChange={ ( value ) => setAttributes( { content: value } ) }
          />
        </label>
        <div className="toggle-content">
          <InnerBlocks />
        </div>
      </div>
    </Fragment>
  );
}

export default compose( [
  withColors( 'backgroundColor', {
    textColor: 'color',
    borderColor: 'border-color',
  } ),
  withFontSizes( 'fontSize' ),
] )( ToggleBoxEdit );
