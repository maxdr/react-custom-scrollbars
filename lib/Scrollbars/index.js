'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf2 = require('raf');

var _raf3 = _interopRequireDefault(_raf2);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isString = require('../utils/isString');

var _isString2 = _interopRequireDefault(_isString);

var _getScrollbarWidth = require('../utils/getScrollbarWidth');

var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);

var _returnFalse = require('../utils/returnFalse');

var _returnFalse2 = _interopRequireDefault(_returnFalse);

var _getInnerWidth = require('../utils/getInnerWidth');

var _getInnerWidth2 = _interopRequireDefault(_getInnerWidth);

var _getInnerHeight = require('../utils/getInnerHeight');

var _getInnerHeight2 = _interopRequireDefault(_getInnerHeight);

var _styles = require('./styles');

var _defaultRenderElements = require('./defaultRenderElements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scrollbars = function (_React$Component) {
    _inherits(Scrollbars, _React$Component);

    function Scrollbars(props) {
        _classCallCheck(this, Scrollbars);

        var _this = _possibleConstructorReturn(this, (Scrollbars.__proto__ || Object.getPrototypeOf(Scrollbars)).call(this, props));

        _this.handleScroll = function (event) {
            var _this$props = _this.props,
                onScroll = _this$props.onScroll,
                onScrollFrame = _this$props.onScrollFrame;

            if (onScroll) onScroll(event);
            _this.update(function (values) {
                var scrollLeft = values.scrollLeft,
                    scrollTop = values.scrollTop;

                _this.viewScrollLeft = scrollLeft;
                _this.viewScrollTop = scrollTop;
                if (onScrollFrame) onScrollFrame(values);
            });
            _this.detectScrolling();
        };

        _this.handleWindowResize = function () {
            _this.update();
        };

        _this.handleHorizontalTrackMouseDown = function (event) {
            event.preventDefault();
            var view = _this.refs.view;
            var target = event.target,
                clientX = event.clientX;

            var _target$getBoundingCl = target.getBoundingClientRect(),
                targetLeft = _target$getBoundingCl.left;

            var thumbWidth = _this.getThumbHorizontalWidth();
            var offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
            view.scrollLeft = _this.getScrollLeftForOffset(offset);
        };

        _this.handleVerticalTrackMouseDown = function (event) {
            event.preventDefault();
            var view = _this.refs.view;
            var target = event.target,
                clientY = event.clientY;

            var _target$getBoundingCl2 = target.getBoundingClientRect(),
                targetTop = _target$getBoundingCl2.top;

            var thumbHeight = _this.getThumbVerticalHeight();
            var offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
            view.scrollTop = _this.getScrollTopForOffset(offset);
        };

        _this.handleHorizontalThumbMouseDown = function (event) {
            event.preventDefault();
            _this.handleDragStart(event);
            var target = event.target,
                clientX = event.clientX;
            var offsetWidth = target.offsetWidth;

            var _target$getBoundingCl3 = target.getBoundingClientRect(),
                left = _target$getBoundingCl3.left;

            _this.prevPageX = offsetWidth - (clientX - left);
        };

        _this.handleVerticalThumbMouseDown = function (event) {
            event.preventDefault();
            _this.handleDragStart(event);
            var target = event.target,
                clientY = event.clientY;
            var offsetHeight = target.offsetHeight;

            var _target$getBoundingCl4 = target.getBoundingClientRect(),
                top = _target$getBoundingCl4.top;

            _this.prevPageY = offsetHeight - (clientY - top);
        };

        _this.handleDragStart = function (event) {
            _this.dragging = true;
            event.stopImmediatePropagation();
            _this.setupDragging();
        };

        _this.handleDrag = function (event) {
            if (_this.prevPageX) {
                var clientX = event.clientX;
                var _this$refs = _this.refs,
                    view = _this$refs.view,
                    trackHorizontal = _this$refs.trackHorizontal;

                var _trackHorizontal$getB = trackHorizontal.getBoundingClientRect(),
                    trackLeft = _trackHorizontal$getB.left;

                var thumbWidth = _this.getThumbHorizontalWidth();
                var clickPosition = thumbWidth - _this.prevPageX;
                var offset = -trackLeft + clientX - clickPosition;
                view.scrollLeft = _this.getScrollLeftForOffset(offset);
            }
            if (_this.prevPageY) {
                var clientY = event.clientY;
                var _this$refs2 = _this.refs,
                    _view = _this$refs2.view,
                    trackVertical = _this$refs2.trackVertical;

                var _trackVertical$getBou = trackVertical.getBoundingClientRect(),
                    trackTop = _trackVertical$getBou.top;

                var thumbHeight = _this.getThumbVerticalHeight();
                var _clickPosition = thumbHeight - _this.prevPageY;
                var _offset = -trackTop + clientY - _clickPosition;
                _view.scrollTop = _this.getScrollTopForOffset(_offset);
            }
            return false;
        };

        _this.handleDragEnd = function () {
            _this.dragging = false;
            _this.prevPageX = _this.prevPageY = 0;
            _this.teardownDragging();
            _this.handleDragEndAutoHide();
        };

        _this.handleDragEndAutoHide = function () {
            var autoHide = _this.props.autoHide;

            if (!autoHide) return;
            _this.hideTracks();
        };

        _this.handleTrackMouseEnter = function () {
            _this.trackMouseOver = true;
            _this.handleTrackMouseEnterAutoHide();
        };

        _this.handleTrackMouseEnterAutoHide = function () {
            var autoHide = _this.props.autoHide;

            if (!autoHide) return;
            _this.showTracks();
        };

        _this.handleTrackMouseLeave = function () {
            _this.trackMouseOver = false;
            _this.handleTrackMouseLeaveAutoHide();
        };

        _this.handleTrackMouseLeaveAutoHide = function () {
            var autoHide = _this.props.autoHide;

            if (!autoHide) return;
            _this.hideTracks();
        };

        _this.state = {
            didMountUniversal: false
        };
        return _this;
    }

    _createClass(Scrollbars, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.addListeners();
            this.update();
            this.componentDidMountUniversal();
        }
    }, {
        key: 'componentDidMountUniversal',
        value: function componentDidMountUniversal() {
            // eslint-disable-line react/sort-comp
            var universal = this.props.universal;

            if (!universal) return;
            this.setState({ didMountUniversal: true });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.update();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeListeners();
            (0, _raf2.cancel)(this.requestFrame);
            clearTimeout(this.hideTracksTimeout);
            clearInterval(this.detectScrollingInterval);
        }
    }, {
        key: 'getScrollLeft',
        value: function getScrollLeft() {
            var view = this.refs.view;

            return view.scrollLeft;
        }
    }, {
        key: 'getScrollTop',
        value: function getScrollTop() {
            var view = this.refs.view;

            return view.scrollTop;
        }
    }, {
        key: 'getScrollWidth',
        value: function getScrollWidth() {
            var view = this.refs.view;

            return view.scrollWidth - this.getPaddingWidth();
        }
    }, {
        key: 'getScrollHeight',
        value: function getScrollHeight() {
            var view = this.refs.view;

            return view.scrollHeight - this.getPaddingHeight();
        }
    }, {
        key: 'getClientWidth',
        value: function getClientWidth() {
            var view = this.refs.view;

            return view.clientWidth - this.getPaddingWidth();
        }
    }, {
        key: 'getClientHeight',
        value: function getClientHeight() {
            var view = this.refs.view;

            return view.clientHeight - this.getPaddingHeight();
        }
    }, {
        key: 'getPaddingWidth',
        value: function getPaddingWidth() {
            return _styles.scrollbarSize;
        }
    }, {
        key: 'getPaddingHeight',
        value: function getPaddingHeight() {
            return _styles.scrollbarSize;
        }
    }, {
        key: 'getValues',
        value: function getValues() {
            var view = this.refs.view;
            var scrollLeft = view.scrollLeft,
                scrollTop = view.scrollTop;


            var scrollWidth = view.scrollWidth - this.getPaddingWidth();
            var scrollHeight = view.scrollHeight - this.getPaddingHeight();
            var clientWidth = view.clientWidth - this.getPaddingWidth();
            var clientHeight = view.clientHeight - this.getPaddingHeight();

            return {
                left: scrollLeft / (scrollWidth - clientWidth) || 0,
                top: scrollTop / (scrollHeight - clientHeight) || 0,
                scrollLeft: scrollLeft,
                scrollTop: scrollTop,
                scrollWidth: scrollWidth,
                scrollHeight: scrollHeight,
                clientWidth: clientWidth,
                clientHeight: clientHeight
            };
        }
    }, {
        key: 'getThumbHorizontalWidth',
        value: function getThumbHorizontalWidth() {
            var _props = this.props,
                thumbSize = _props.thumbSize,
                thumbMinSize = _props.thumbMinSize;
            var _refs = this.refs,
                view = _refs.view,
                trackHorizontal = _refs.trackHorizontal;

            var scrollWidth = view.scrollWidth - this.getPaddingWidth();
            var clientWidth = view.clientWidth - this.getPaddingWidth();
            var trackWidth = (0, _getInnerWidth2.default)(trackHorizontal);
            var width = clientWidth / scrollWidth * trackWidth;
            if (scrollWidth <= clientWidth) return 0;
            if (thumbSize) return thumbSize;
            return Math.max(width, thumbMinSize);
        }
    }, {
        key: 'getThumbVerticalHeight',
        value: function getThumbVerticalHeight() {
            var _props2 = this.props,
                thumbSize = _props2.thumbSize,
                thumbMinSize = _props2.thumbMinSize;
            var _refs2 = this.refs,
                view = _refs2.view,
                trackVertical = _refs2.trackVertical;

            var scrollHeight = view.scrollHeight - this.getPaddingHeight();
            var clientHeight = view.clientHeight - this.getPaddingHeight();
            var trackHeight = (0, _getInnerHeight2.default)(trackVertical);
            var height = clientHeight / scrollHeight * trackHeight;
            if (scrollHeight <= clientHeight) return 0;
            if (thumbSize) return thumbSize;
            return Math.max(height, thumbMinSize);
        }
    }, {
        key: 'getScrollLeftForOffset',
        value: function getScrollLeftForOffset(offset) {
            var _refs3 = this.refs,
                view = _refs3.view,
                trackHorizontal = _refs3.trackHorizontal;

            var scrollWidth = view.scrollWidth - this.getPaddingWidth();
            var clientWidth = view.clientWidth - this.getPaddingWidth();
            var trackWidth = (0, _getInnerWidth2.default)(trackHorizontal);
            var thumbWidth = this.getThumbHorizontalWidth();
            return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
        }
    }, {
        key: 'getScrollTopForOffset',
        value: function getScrollTopForOffset(offset) {
            var _refs4 = this.refs,
                view = _refs4.view,
                trackVertical = _refs4.trackVertical;

            var scrollHeight = view.scrollHeight - this.getPaddingHeight();
            var clientHeight = view.clientHeight - this.getPaddingHeight();
            var trackHeight = (0, _getInnerHeight2.default)(trackVertical);
            var thumbHeight = this.getThumbVerticalHeight();
            return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
        }
    }, {
        key: 'scrollLeft',
        value: function scrollLeft() {
            var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var view = this.refs.view;

            view.scrollLeft = left;
        }
    }, {
        key: 'scrollTop',
        value: function scrollTop() {
            var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var view = this.refs.view;

            view.scrollTop = top;
        }
    }, {
        key: 'scrollToLeft',
        value: function scrollToLeft() {
            var view = this.refs.view;

            view.scrollLeft = 0;
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {
            var view = this.refs.view;

            view.scrollTop = 0;
        }
    }, {
        key: 'scrollToRight',
        value: function scrollToRight() {
            var view = this.refs.view;

            view.scrollLeft = view.scrollWidth - this.getPaddingWidth();
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            var view = this.refs.view;

            view.scrollTop = view.scrollHeight - this.getPaddingHeight();
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            /* istanbul ignore if */
            if (typeof document === 'undefined') return;
            var _refs5 = this.refs,
                view = _refs5.view,
                trackHorizontal = _refs5.trackHorizontal,
                trackVertical = _refs5.trackVertical,
                thumbHorizontal = _refs5.thumbHorizontal,
                thumbVertical = _refs5.thumbVertical;

            view.addEventListener('scroll', this.handleScroll);
            trackHorizontal.addEventListener('mouseenter', this.handleTrackMouseEnter);
            trackHorizontal.addEventListener('mouseleave', this.handleTrackMouseLeave);
            trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
            trackVertical.addEventListener('mouseenter', this.handleTrackMouseEnter);
            trackVertical.addEventListener('mouseleave', this.handleTrackMouseLeave);
            trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
            thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
            thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
            window.addEventListener('resize', this.handleWindowResize);
        }
    }, {
        key: 'removeListeners',
        value: function removeListeners() {
            /* istanbul ignore if */
            if (typeof document === 'undefined') return;
            var _refs6 = this.refs,
                view = _refs6.view,
                trackHorizontal = _refs6.trackHorizontal,
                trackVertical = _refs6.trackVertical,
                thumbHorizontal = _refs6.thumbHorizontal,
                thumbVertical = _refs6.thumbVertical;

            view.removeEventListener('scroll', this.handleScroll);
            trackHorizontal.removeEventListener('mouseenter', this.handleTrackMouseEnter);
            trackHorizontal.removeEventListener('mouseleave', this.handleTrackMouseLeave);
            trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
            trackVertical.removeEventListener('mouseenter', this.handleTrackMouseEnter);
            trackVertical.removeEventListener('mouseleave', this.handleTrackMouseLeave);
            trackVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
            thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
            thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
            window.removeEventListener('resize', this.handleWindowResize);
            // Possibly setup by `handleDragStart`
            this.teardownDragging();
        }
    }, {
        key: 'handleScrollStart',
        value: function handleScrollStart() {
            var onScrollStart = this.props.onScrollStart;

            if (onScrollStart) onScrollStart();
            this.handleScrollStartAutoHide();
        }
    }, {
        key: 'handleScrollStartAutoHide',
        value: function handleScrollStartAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.showTracks();
        }
    }, {
        key: 'handleScrollStop',
        value: function handleScrollStop() {
            var onScrollStop = this.props.onScrollStop;

            if (onScrollStop) onScrollStop();
            this.handleScrollStopAutoHide();
        }
    }, {
        key: 'handleScrollStopAutoHide',
        value: function handleScrollStopAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.hideTracks();
        }
    }, {
        key: 'setupDragging',
        value: function setupDragging() {
            (0, _domCss2.default)(document.body, _styles.disableSelectStyle);
            document.addEventListener('mousemove', this.handleDrag);
            document.addEventListener('mouseup', this.handleDragEnd);
            document.onselectstart = _returnFalse2.default;
        }
    }, {
        key: 'teardownDragging',
        value: function teardownDragging() {
            (0, _domCss2.default)(document.body, _styles.disableSelectStyleReset);
            document.removeEventListener('mousemove', this.handleDrag);
            document.removeEventListener('mouseup', this.handleDragEnd);
            document.onselectstart = undefined;
        }
    }, {
        key: 'showTracks',
        value: function showTracks() {
            var _refs7 = this.refs,
                trackHorizontal = _refs7.trackHorizontal,
                trackVertical = _refs7.trackVertical;

            clearTimeout(this.hideTracksTimeout);
            (0, _domCss2.default)(trackHorizontal, { opacity: 1 });
            (0, _domCss2.default)(trackVertical, { opacity: 1 });
        }
    }, {
        key: 'hideTracks',
        value: function hideTracks() {
            if (this.dragging) return;
            if (this.scrolling) return;
            if (this.trackMouseOver) return;
            var autoHideTimeout = this.props.autoHideTimeout;
            var _refs8 = this.refs,
                trackHorizontal = _refs8.trackHorizontal,
                trackVertical = _refs8.trackVertical;

            clearTimeout(this.hideTracksTimeout);
            this.hideTracksTimeout = setTimeout(function () {
                (0, _domCss2.default)(trackHorizontal, { opacity: 0 });
                (0, _domCss2.default)(trackVertical, { opacity: 0 });
            }, autoHideTimeout);
        }
    }, {
        key: 'detectScrolling',
        value: function detectScrolling() {
            var _this2 = this;

            if (this.scrolling) return;
            this.scrolling = true;
            this.handleScrollStart();
            this.detectScrollingInterval = setInterval(function () {
                if (_this2.lastViewScrollLeft === _this2.viewScrollLeft && _this2.lastViewScrollTop === _this2.viewScrollTop) {
                    clearInterval(_this2.detectScrollingInterval);
                    _this2.scrolling = false;
                    _this2.handleScrollStop();
                }
                _this2.lastViewScrollLeft = _this2.viewScrollLeft;
                _this2.lastViewScrollTop = _this2.viewScrollTop;
            }, 100);
        }
    }, {
        key: 'raf',
        value: function raf(callback) {
            var _this3 = this;

            if (this.requestFrame) _raf3.default.cancel(this.requestFrame);
            this.requestFrame = (0, _raf3.default)(function () {
                _this3.requestFrame = undefined;
                callback();
            });
        }
    }, {
        key: 'update',
        value: function update(callback) {
            var _this4 = this;

            this.raf(function () {
                return _this4._update(callback);
            });
        }
    }, {
        key: '_update',
        value: function _update(callback) {
            var _props3 = this.props,
                onUpdate = _props3.onUpdate,
                hideTracksWhenNotNeeded = _props3.hideTracksWhenNotNeeded;
            var _refs9 = this.refs,
                thumbHorizontal = _refs9.thumbHorizontal,
                thumbVertical = _refs9.thumbVertical,
                trackHorizontal = _refs9.trackHorizontal,
                trackVertical = _refs9.trackVertical,
                container = _refs9.container;

            container.scrollTop = 0;
            container.scrollLeft = 0;
            var values = this.getValues();
            var scrollLeft = values.scrollLeft,
                clientWidth = values.clientWidth,
                scrollWidth = values.scrollWidth;

            var trackHorizontalWidth = (0, _getInnerWidth2.default)(trackHorizontal);
            var thumbHorizontalWidth = this.getThumbHorizontalWidth();
            var thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
            var thumbHorizontalStyle = {
                width: thumbHorizontalWidth,
                transform: 'translateX(' + thumbHorizontalX + 'px)'
            };
            var scrollTop = values.scrollTop,
                clientHeight = values.clientHeight,
                scrollHeight = values.scrollHeight;

            var trackVerticalHeight = (0, _getInnerHeight2.default)(trackVertical);
            var thumbVerticalHeight = this.getThumbVerticalHeight();
            var thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
            var thumbVerticalStyle = {
                height: thumbVerticalHeight,
                transform: 'translateY(' + thumbVerticalY + 'px)'
            };
            if (hideTracksWhenNotNeeded) {
                var trackHorizontalStyle = {
                    visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
                };
                var trackVerticalStyle = {
                    visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
                };
                (0, _domCss2.default)(trackHorizontal, trackHorizontalStyle);
                (0, _domCss2.default)(trackVertical, trackVerticalStyle);
            }
            (0, _domCss2.default)(thumbHorizontal, thumbHorizontalStyle);
            (0, _domCss2.default)(thumbVertical, thumbVerticalStyle);
            if (onUpdate) onUpdate(values);
            if (typeof callback !== 'function') return;
            callback(values);
        }
    }, {
        key: 'render',
        value: function render() {
            var scrollbarWidth = (0, _getScrollbarWidth2.default)();
            /* eslint-disable no-unused-vars */

            var _props4 = this.props,
                onScroll = _props4.onScroll,
                onScrollFrame = _props4.onScrollFrame,
                onScrollStart = _props4.onScrollStart,
                onScrollStop = _props4.onScrollStop,
                onUpdate = _props4.onUpdate,
                renderView = _props4.renderView,
                renderTrackHorizontal = _props4.renderTrackHorizontal,
                renderTrackVertical = _props4.renderTrackVertical,
                renderThumbHorizontal = _props4.renderThumbHorizontal,
                renderThumbVertical = _props4.renderThumbVertical,
                tagName = _props4.tagName,
                hideTracksWhenNotNeeded = _props4.hideTracksWhenNotNeeded,
                autoHide = _props4.autoHide,
                autoHideTimeout = _props4.autoHideTimeout,
                autoHideDuration = _props4.autoHideDuration,
                thumbSize = _props4.thumbSize,
                thumbMinSize = _props4.thumbMinSize,
                universal = _props4.universal,
                autoHeight = _props4.autoHeight,
                autoHeightMin = _props4.autoHeightMin,
                autoHeightMax = _props4.autoHeightMax,
                style = _props4.style,
                children = _props4.children,
                props = _objectWithoutProperties(_props4, ['onScroll', 'onScrollFrame', 'onScrollStart', 'onScrollStop', 'onUpdate', 'renderView', 'renderTrackHorizontal', 'renderTrackVertical', 'renderThumbHorizontal', 'renderThumbVertical', 'tagName', 'hideTracksWhenNotNeeded', 'autoHide', 'autoHideTimeout', 'autoHideDuration', 'thumbSize', 'thumbMinSize', 'universal', 'autoHeight', 'autoHeightMin', 'autoHeightMax', 'style', 'children']);
            /* eslint-enable no-unused-vars */

            var didMountUniversal = this.state.didMountUniversal;


            var containerStyle = _extends({}, _styles.containerStyleDefault, autoHeight && _extends({}, _styles.containerStyleAutoHeight, {
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax
            }), style);

            var viewStyle = _extends({}, _styles.viewStyleDefault, {
                // Hide scrollbars by setting a negative margin
                marginRight: -this.getPaddingWidth() + (scrollbarWidth ? -scrollbarWidth : 0),
                marginBottom: -this.getPaddingHeight() + (scrollbarWidth ? -scrollbarWidth : 0)
            }, autoHeight && _extends({}, _styles.viewStyleAutoHeight, {
                // Add paddingHeight and scrollbarWidth to autoHeight in order to compensate negative margins
                minHeight: (0, _isString2.default)(autoHeightMin) ? 'calc(' + autoHeightMin + ' + ' + (this.getPaddingHeight() + scrollbarWidth) + 'px)' : autoHeightMin + this.getPaddingHeight() + scrollbarWidth,
                maxHeight: (0, _isString2.default)(autoHeightMax) ? 'calc(' + autoHeightMax + ' + ' + (this.getPaddingHeight() + scrollbarWidth) + 'px)' : autoHeightMax + this.getPaddingHeight() + scrollbarWidth
            }), autoHeight && universal && !didMountUniversal && {
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax
            }, universal && !didMountUniversal && _styles.viewStyleUniversalInitial);

            var viewWrapperStyle = _extends({}, _styles.viewWrapperStyleDefault, autoHeight && _extends({}, _styles.viewWrapperStyleAutoHeight));

            var viewWrappedStyle = _extends({}, _styles.viewWrappedStyleDefault);

            var trackAutoHeightStyle = {
                transition: 'opacity ' + autoHideDuration + 'ms',
                opacity: 0
            };

            var trackHorizontalStyle = _extends({}, _styles.trackHorizontalStyleDefault, autoHide && trackAutoHeightStyle, universal && !didMountUniversal && {
                display: 'none'
            });

            var trackVerticalStyle = _extends({}, _styles.trackVerticalStyleDefault, autoHide && trackAutoHeightStyle, universal && !didMountUniversal && {
                display: 'none'
            });

            return (0, _react.createElement)(tagName, { className: props.className ? props.className : '', style: containerStyle, ref: 'container' }, [(0, _react.createElement)('div', { style: viewStyle, key: 'view', ref: 'view' }, [(0, _react.createElement)('div', { style: viewWrapperStyle, key: 'viewWrapper', ref: 'viewWrapper' }, [(0, _react.cloneElement)(renderView({ style: viewWrappedStyle }), { key: 'viewWrapped', ref: 'viewWrapped' }, children)])]), (0, _react.cloneElement)(renderTrackHorizontal({ style: trackHorizontalStyle }), { key: 'trackHorizontal', ref: 'trackHorizontal' }, (0, _react.cloneElement)(renderThumbHorizontal({ style: _styles.thumbHorizontalStyleDefault }), { ref: 'thumbHorizontal' })), (0, _react.cloneElement)(renderTrackVertical({ style: trackVerticalStyle }), { key: 'trackVertical', ref: 'trackVertical' }, (0, _react.cloneElement)(renderThumbVertical({ style: _styles.thumbVerticalStyleDefault }), { ref: 'thumbVertical' }))]);
        }
    }]);

    return Scrollbars;
}(_react2.default.Component);

Scrollbars.propTypes = {
    onScroll: _propTypes2.default.func,
    onScrollFrame: _propTypes2.default.func,
    onScrollStart: _propTypes2.default.func,
    onScrollStop: _propTypes2.default.func,
    onUpdate: _propTypes2.default.func,
    renderView: _propTypes2.default.func,
    renderTrackHorizontal: _propTypes2.default.func,
    renderTrackVertical: _propTypes2.default.func,
    renderThumbHorizontal: _propTypes2.default.func,
    renderThumbVertical: _propTypes2.default.func,
    tagName: _propTypes2.default.string,
    thumbSize: _propTypes2.default.number,
    thumbMinSize: _propTypes2.default.number,
    hideTracksWhenNotNeeded: _propTypes2.default.bool,
    autoHide: _propTypes2.default.bool,
    autoHideTimeout: _propTypes2.default.number,
    autoHideDuration: _propTypes2.default.number,
    autoHeight: _propTypes2.default.bool,
    autoHeightMin: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    autoHeightMax: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    universal: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    children: _propTypes2.default.node
};
Scrollbars.defaultProps = {
    renderView: _defaultRenderElements.renderViewDefault,
    renderTrackHorizontal: _defaultRenderElements.renderTrackHorizontalDefault,
    renderTrackVertical: _defaultRenderElements.renderTrackVerticalDefault,
    renderThumbHorizontal: _defaultRenderElements.renderThumbHorizontalDefault,
    renderThumbVertical: _defaultRenderElements.renderThumbVerticalDefault,
    tagName: 'div',
    thumbMinSize: 30,
    hideTracksWhenNotNeeded: false,
    autoHide: false,
    autoHideTimeout: 1000,
    autoHideDuration: 200,
    autoHeight: false,
    autoHeightMin: 0,
    autoHeightMax: 200,
    universal: false
};
;

exports.default = Scrollbars;