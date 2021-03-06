"use strict";

System.register(["app/plugins/sdk", "./css/query-editor.css!", "lodash", "./constants"], function (_export, _context) {
    "use strict";

    var QueryCtrl, _, ALL_OPERATORS, ALL_DEVICES, DEFAULT_DEVICE, DEFAULT_GROUP_BY_OP, DEFAULT_SELECT_FIELD, DEFAULT_SELECT_NS, DEFAULT_SELECT_PROJECT, DEFAULT_WHERE, NONE, _createClass, iobeamDatasourceQueryCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            QueryCtrl = _appPluginsSdk.QueryCtrl;
        }, function (_cssQueryEditorCss) {}, function (_lodash) {
            _ = _lodash.default;
        }, function (_constants) {
            ALL_OPERATORS = _constants.ALL_OPERATORS;
            ALL_DEVICES = _constants.ALL_DEVICES;
            DEFAULT_DEVICE = _constants.DEFAULT_DEVICE;
            DEFAULT_GROUP_BY_OP = _constants.DEFAULT_GROUP_BY_OP;
            DEFAULT_SELECT_FIELD = _constants.DEFAULT_SELECT_FIELD;
            DEFAULT_SELECT_NS = _constants.DEFAULT_SELECT_NS;
            DEFAULT_SELECT_PROJECT = _constants.DEFAULT_SELECT_PROJECT;
            DEFAULT_WHERE = _constants.DEFAULT_WHERE;
            NONE = _constants.NONE;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("iobeamDatasourceQueryCtrl", iobeamDatasourceQueryCtrl = function (_QueryCtrl) {
                _inherits(iobeamDatasourceQueryCtrl, _QueryCtrl);

                function iobeamDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
                    _classCallCheck(this, iobeamDatasourceQueryCtrl);

                    var _this = _possibleConstructorReturn(this, (iobeamDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(iobeamDatasourceQueryCtrl)).call(this, $scope, $injector));

                    _this.scope = $scope;
                    _this.target = _this.target;
                    _this.uiSegmentSrv = uiSegmentSrv;
                    _this.target.target = _this.target.target || DEFAULT_SELECT_FIELD;
                    _this.target.device_id = _this.target.device_id || DEFAULT_DEVICE;
                    _this.target.group_by_field = _this.target.group_by_field || NONE;
                    _this.target.group_by_operator = _this.target.group_by_operator || DEFAULT_GROUP_BY_OP;
                    _this.target.interval = _this.target.interval || _this.panelCtrl.interval;
                    _this.target.limit_by_field = _this.target.limit_by_field || NONE;
                    _this.target.limit_by_count = _this.target.limit_by_count || 1;

                    _this.target.wheres = _this.target.wheres || [[_this.uiSegmentSrv.newPlusButton()]];
                    for (var i = 0; i < _this.target.wheres.length; i++) {
                        for (var j = 0; j < _this.target.wheres[i].length; j++) {
                            var temp = _this.target.wheres[i][j];
                            if (temp.type === "clause") {
                                var newClause = _this.uiSegmentSrv.newSegment(temp.value);
                                newClause.cssClass = temp.cssClass;
                                newClause.type = temp.type;
                                _this.target.wheres[i][j] = newClause;
                            }
                        }
                    }
                    _this.projectSegment = uiSegmentSrv.getSegmentForValue(_this.target.project, DEFAULT_SELECT_PROJECT);
                    _this.namespaceSegment = uiSegmentSrv.getSegmentForValue(_this.target.namespace, DEFAULT_SELECT_NS);
                    _this.fieldSegment = uiSegmentSrv.getSegmentForValue(_this.target.target, DEFAULT_SELECT_FIELD);
                    _this.deviceSegment = uiSegmentSrv.getSegmentForValue(_this.target.device_id, DEFAULT_DEVICE);
                    return _this;
                }

                /** Add a new where row to the UI, pushing down the plus button **/


                _createClass(iobeamDatasourceQueryCtrl, [{
                    key: "addWhereRow",
                    value: function addWhereRow(rowIdx) {
                        var field = this.uiSegmentSrv.newSegment("");
                        field.cssClass = "io-segment io-where-clause";
                        field.type = "clause";
                        var del = this.uiSegmentSrv.newSegment("");
                        del.html = "<i class=\"fa fa-trash\"></i>";
                        del.type = "delete";
                        del.cssClass = "io-segment";
                        var button = this.uiSegmentSrv.newPlusButton();
                        button.cssClass = "io-segment-no-left";

                        this.target.wheres[rowIdx] = [field, del];
                        this.target.wheres.push([button]);
                    }
                }, {
                    key: "wheresClicked",
                    value: function wheresClicked(segment, rowIdx, idx) {
                        // Handle plus button clicks
                        if (segment.type === "plus-button") {
                            // Only add a row if the previous one is non-empty clause
                            if (rowIdx === 0 || this.target.wheres[rowIdx - 1][0].value !== "") {
                                this.addWhereRow(rowIdx);
                            } else {
                                // Prevents user from 'editting' the button
                                this.target.wheres[rowIdx][idx] = this.uiSegmentSrv.newPlusButton();
                            }
                        } else if (segment.type === "delete") {
                            // Handle delete clicks
                            this.target.wheres.splice(rowIdx, 1);
                            this.panelCtrl.refresh();
                        }
                        return new Promise(function () {});
                    }
                }, {
                    key: "wheresUpdated",
                    value: function wheresUpdated(segment, rowIdx, idx) {
                        this.panelCtrl.refresh();
                    }
                }, {
                    key: "wheresEntered",
                    value: function wheresEntered(event, rowIdx, idx) {
                        if (event && event.target) {
                            this.target.wheres[rowIdx][idx].value = event.target.value;
                            this.panelCtrl.refresh();
                        }
                    }
                }, {
                    key: "limitCount",
                    value: function limitCount(event) {
                        this.target.limit_by_count = event.target.value;
                        this.panelCtrl.refresh();
                    }
                }, {
                    key: "intervalClicked",
                    value: function intervalClicked() {
                        return new Promise(function () {});
                    }
                }, {
                    key: "getOptions",
                    value: function getOptions() {
                        return this.datasource.fieldQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
                    }
                }, {
                    key: "getGroupByOptions",
                    value: function getGroupByOptions() {
                        return this.datasource.fieldQuery(this.target).then(function (results) {
                            return [{ value: NONE, text: NONE }].concat(results);
                        }).then(this.uiSegmentSrv.transformToSegments(false));
                    }
                }, {
                    key: "getLimitByOptions",
                    value: function getLimitByOptions() {
                        return this.datasource.limitByFieldsQuery(this.target).then(function (results) {
                            return [{ value: NONE, text: NONE }].concat(results);
                        }).then(this.uiSegmentSrv.transformToSegments(false));
                    }
                }, {
                    key: "getProjects",
                    value: function getProjects() {
                        return this.datasource.projectQuery().then(function (results) {
                            return [{ text: NONE, value: NONE }].concat(results);
                        }).then(this.uiSegmentSrv.transformToSegments(false));
                    }
                }, {
                    key: "getNamespaces",
                    value: function getNamespaces() {
                        var self = this;
                        return this.datasource.namespaceQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
                    }
                }, {
                    key: "getDevices",
                    value: function getDevices() {
                        return this.datasource.deviceQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
                    }
                }, {
                    key: "getOperators",
                    value: function getOperators() {
                        var operators = [NONE].concat(ALL_OPERATORS);
                        return new Promise(function (resolve) {
                            resolve(operators.map(function (v) {
                                return { text: v, value: v };
                            }));
                        }).then(this.uiSegmentSrv.transformToSegments(false));
                    }
                }, {
                    key: "toggleEditorMode",
                    value: function toggleEditorMode() {
                        this.target.rawQuery = !this.target.rawQuery;
                    }
                }, {
                    key: "onChangeInternal",
                    value: function onChangeInternal() {
                        this.refresh(); // Asks the panel to refresh data.
                    }
                }, {
                    key: "onChangeDevice",
                    value: function onChangeDevice() {
                        this.target.device_id = this.deviceSegment.value;
                        this.refresh();
                    }
                }, {
                    key: "onChangeNamespace",
                    value: function onChangeNamespace() {
                        this.target.namespace = this.namespaceSegment.value;
                        this.refresh();
                    }
                }, {
                    key: "onChangeField",
                    value: function onChangeField() {
                        this.target.target = this.fieldSegment.value;
                        this.refresh();
                    }
                }, {
                    key: "onChangeProject",
                    value: function onChangeProject() {
                        // reset namespace value in selector
                        this.namespaceSegment.value = DEFAULT_SELECT_NS;
                        this.namespaceSegment.html = DEFAULT_SELECT_NS;
                        this.fieldSegment.value = DEFAULT_SELECT_FIELD;
                        this.fieldSegment.html = DEFAULT_SELECT_FIELD;
                        this.deviceSegment.value = DEFAULT_DEVICE;
                        this.deviceSegment.html = DEFAULT_DEVICE;
                        this.target.project = this.projectSegment.value;
                        this.refresh();
                    }
                }]);

                return iobeamDatasourceQueryCtrl;
            }(QueryCtrl));

            _export("iobeamDatasourceQueryCtrl", iobeamDatasourceQueryCtrl);

            iobeamDatasourceQueryCtrl.templateUrl = "partials/query.editor.html";
        }
    };
});
//# sourceMappingURL=query_ctrl.js.map
