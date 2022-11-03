// import 'mathlive/dist/mathlive-fonts.css';
import './mathlive.min';
import React, { useMemo, useEffect, useRef, useCallback, useLayoutEffect, useImperativeHandle } from 'react';
import isEqual from 'lodash.isequal';
import { renderToString } from 'react-dom/server';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["onContentWillChange", "onContentDidChange"];
var OPTIONS = ['backgroundColorMap', 'backgroundColorMap', 'createHTML', 'customVirtualKeyboardLayers', 'customVirtualKeyboards', 'defaultMode', 'fontsDirectory', 'horizontalSpacingScale', 'inlineShortcutTimeout', 'inlineShortcuts', 'keybindings', 'keypressSound', 'keypressVibration', 'letterShapeStyle', 'locale', 'macros', 'mathModeSpace', 'onBlur', 'onCommit', 'onContentDidChange', 'onContentWillChange', 'onError', 'onExport', 'onFocus', 'onKeystroke', 'onModeChange', 'onMoveOutOf', 'onPlaceholderDidChange', 'onReadAloudStatus', 'onSelectionDidChange', 'onSelectionWillChange', 'onTabOutOf', 'onUndoStateDidChange', 'onUndoStateWillChange', 'originValidator', 'plonkSound', 'readAloudHook', 'readOnly', 'registers', 'removeExtraneousParentheses', 'scriptDepth', 'sharedVirtualKeyboardTargetOrigin', 'smartFence', 'smartMode', 'smartSuperscript', 'soundsDirectory', 'speakHook', 'speechEngine', 'speechEngineRate', 'speechEngineVoice', 'strings', 'textToSpeechMarkup', 'textToSpeechRules', 'textToSpeechRulesOptions', 'useSharedVirtualKeyboard', 'virtualKeyboardContainer', 'virtualKeyboardLayout', 'virtualKeyboardMode', 'virtualKeyboardTheme', 'virtualKeyboardToggleGlyph', 'virtualKeyboardToolbar', 'virtualKeyboards'];
var FUNCTION_MAPPING = {
  onChange: 'input',
  onInput: 'input',
  onMathFieldFocus: 'focus',
  onMathFieldBlur: 'blur',
  onCommit: 'change',
  onError: 'math-error',
  onKeystroke: 'keystroke',
  onModeChange: 'mode-change',
  onMoveOutOf: 'focus-out',
  onReadAloudStatus: 'read-aloud-status',
  onSelectionWillChange: 'selection-will-change',
  onUndoStateDidChange: 'undo-state-did-change',
  onUndoStateWillChange: 'undo-state-will-change',
  onVirtualKeyboardToggle: 'virtual-keyboard-toggle'
};
var FUNCTION_PROPS = Object.keys(FUNCTION_MAPPING);
var MAPPING = {
  className: 'class',
  htmlFor: 'for'
};
function useValue(props, ref) {
  var value = useMemo(function () {
    return props.children ? renderToString(props.children) : props.value || "";
  }, [props.children, props.value]);
  useEffect(function () {
    var _ref$current;

    (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.setValue(value);
  }, [value]);
  return value;
}
function filterConfig(props) {
  var config = {};
  var passProps = {};

  for (var _key in props) {
    var key = MAPPING[_key] || _key;
    var value = props[_key];

    if (FUNCTION_PROPS.indexOf(key) > -1) ; else if (OPTIONS.indexOf(key) > -1) {
      if (React.isValidElement(value) || value instanceof Array && value.every(React.isValidElement)) {
        value = renderToString(value);
      }

      config[key] = value;
    } else if (key !== 'value') {
      passProps[key] = value;
    }
  }

  return [config, passProps];
}
function useControlledConfig(value, _ref) {
  var onContentWillChange = _ref.onContentWillChange,
      onContentDidChange = _ref.onContentDidChange,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var position = useRef(null);

  var _value = useRef(value || '');

  var _onContentWillChange = useCallback(function (sender) {
    var p = _value.current !== value && sender.getCaretPoint && sender.getCaretPoint();
    p && (position.current = p);
    onContentWillChange && onContentWillChange(sender);
  }, [onContentWillChange, value]);

  var _onContentDidChange = useCallback(function (sender) {
    position.current && sender.setCaretPoint(position.current.x, position.current.y);
    onContentDidChange && onContentDidChange(sender);
  }, [onContentDidChange]);

  useEffect(function () {
    _value.current = value || '';
  }, [value]);
  return _extends({}, props, {
    onContentWillChange: _onContentWillChange,
    onContentDidChange: _onContentDidChange
  });
}
function useUpdateOptions(ref, config) {
  var configRef = useRef(config);
  useLayoutEffect(function () {
    if (!isEqual(configRef.current, config)) {
      var _ref$current2;

      (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.setOptions(config);
      configRef.current = config;
    }
  }, [ref, config, configRef]);
  useEffect(function () {
    var _ref$current3;

    (_ref$current3 = ref.current) === null || _ref$current3 === void 0 ? void 0 : _ref$current3.setOptions(config);
  }, []);
}
function useEventRegistration(ref, props) {
  useEffect(function () {
    var node = ref.current;
    if (!node) return;
    var fns = Object.keys(props).filter(function (key) {
      return typeof props[key] === 'function' && FUNCTION_PROPS.indexOf(MAPPING[key] || key) > -1;
    }).map(function (key) {
      return {
        key: FUNCTION_MAPPING[MAPPING[key] || key],
        fn: function fn() {
          props[key].apply(props, arguments);
        }
      };
    });
    fns.forEach(function (_ref2) {
      var key = _ref2.key,
          fn = _ref2.fn;
      node.addEventListener(key, fn);
    });
    return function () {
      fns.forEach(function (_ref3) {
        var key = _ref3.key,
            fn = _ref3.fn;
        return node.removeEventListener(key, fn);
      });
    };
  }, [ref, props]);
}

var MathView = React.forwardRef(function (props, ref) {
  var _ref = useRef(null);

  useImperativeHandle(ref, function () {
    return _ref.current;
  }, [_ref]);
  var value = useValue(props, _ref);

  var _useMemo = useMemo(function () {
    return filterConfig(props);
  }, [props]),
      config = _useMemo[0],
      passProps = _useMemo[1];

  var transformedConfig = useControlledConfig(value, config);
  useEventRegistration(_ref, props);
  useUpdateOptions(_ref, transformedConfig);
  return React.createElement("math-field", Object.assign({}, passProps, {
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onChange: undefined,
    ref: _ref
  }), value);
});

export default MathView;
//# sourceMappingURL=index.modern.js.map
