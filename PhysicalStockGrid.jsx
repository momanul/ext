import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Card, CardBody, CardHeader, Col, Button, Row,  FormGroup, Table ,Label,Input } from "reactstrap";
import Pagination from "react-js-pagination";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "../../../assets/scss/custom.css";
import BASE from "../../../configs/BASE";

import "../sales/SalesGrid.css";

const PhysicalStockGrid = () => {

  const [fresh, setFresh] = useState(false);
  const [products, setProducts] = useState([]);

  const [publisherList, setPublisherList] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [publisherValue, setPublisherValue] = useState("0");

  const [editionList, setEditionList] = useState([]);
  const [edition, setedition] = useState([]);
  const [editionValue, setEditionValue] = useState("0");

  const [typeList, setTypeList] = useState([]);
  const [type, setType] = useState([]);
  const [typeValue, setTypeValue] = useState("0");

  const [classList, setClassList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classValue, setClassValue] = useState("0");

  const [productTitleList, setProductTitleList] = useState([]);
  const [productTitle, setProductTitle] = useState([]);
  const [productTitleValue, setProductTitleValue] = useState("0");

  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const [totalNo, setTotalNo] = useState(0);
  const [searchCol, setSearchCol] = useState("");

  const [totalCurrentStock, setTotalCurrentStock] = useState(0);
  const [unitRate, setUnitRate] = useState(0);
  const [totalPurchaseValue, setTotalPurchaseValue] = useState(0);
  const [resetValue, setResetValue] = useState("");
  const [resetAction, setResetAction] = useState("clear");



  const getTotal = ()=>{

    let currentStock = 0;
    let lastPurchaseRate = 0;
    let purchaseValue = 0;

    products.map((e) => {

      currentStock += e.cUR_Stok;
      lastPurchaseRate += e.lstPurRate;
      purchaseValue += e.lstPurRate*e.cUR_Stok;
    });
    setTotalCurrentStock(currentStock);
    setUnitRate(lastPurchaseRate);
    setTotalPurchaseValue(Math.round(purchaseValue));
  }



  const handleSearchAble = (e) => {
    setSearchCol(e.target.value);
  };

  const changePageSize = (e) => {
    setActivePage(1);
    setPageSize(e.target.value);
  };

  const handlePageChange = (pNumber) => {
    setActivePage(pNumber);
  };

  const getPublisherList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRAMNF0303/${editionValue}/${productTitleValue}/${typeValue}/${classValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setPublisherList(data.data);
  };

  const onChangePublisher = (value, { action, removedValue }) => {
    setPublisher(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setPublisherValue(list);
    } else {
      setPublisherValue("0");
    }
    if (action === "clear") {
      setPublisherValue("0");
    }
    setFresh(!fresh);
  };
  const getEdditionList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRASKU0707/${productTitleValue}/${typeValue}/${classValue}/${publisherValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setEditionList(data.data);
  };

  const onChangeEdtion = (value, { action, removedValue }) => {
    setedition(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setEditionValue(list);
    } else {
      setEditionValue("0");
    }
    if (action === "clear") {
      setEditionValue("0");
    }
    setFresh(!fresh);
  };

  const getTypeList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRABR02002/${editionValue}/${productTitleValue}/${classValue}/${publisherValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setTypeList(data.data);
  };

  const onChangeType = (value, { action, removedValue }) => {
    setType(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setTypeValue(list);
    } else {
      setTypeValue("0");
    }
    if (action === "clear") {
      setTypeValue("0");
    }
    setFresh(!fresh);
  };

  const getProductTitleList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRAGE06006/${editionValue}/${typeValue}/${classValue}/${publisherValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setProductTitleList(data.data);
  };

  const onChangeProductTitle = (value, { action, removedValue }) => {
    setProductTitle(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setProductTitleValue(list);
    } else {
      setProductTitleValue("0");
    }
    if (action === "clear") {
      setProductTitleValue("0");
    }
    setFresh(!fresh);
  };

  const getClassList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRACT01001/${editionValue}/${productTitleValue}/${typeValue}/${publisherValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setClassList(data.data);
  };

  const onChangeClass = (value, { action, removedValue }) => {
    setClasses(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setClassValue(list);
    } else {
      setClassValue("0");
    }
    if (action === "clear") {
      setClassValue("0");
    }
    setFresh(!fresh);
  };

  const handleSearch = async (e) => {
    let url = `${BASE.URL}/api/Griddata/GETASKU0707/pn/${activePage}/ps/${pageSize}/${editionValue}/${productTitleValue}/${typeValue}/${classValue}/${publisherValue}/sR/${searchCol}`;
    let returnData = await axios({
      url: url,
      method: "get",
    });
    setProducts(returnData.data[0].data);
    setTotalNo(returnData.data[0].totalRow);
    //setActivePage(activePage);
    //setFresh(!fresh);
  };

  const handleClear = () => { 
    onChangePublisher(resetValue, { resetAction});
    onChangeClass(resetValue, {resetAction});
    onChangeType(resetValue, {resetAction});
    onChangeProductTitle(resetValue, {resetAction});
    onChangeEdtion(resetValue, {resetAction});
  };

  useEffect(() => {
    getPublisherList();
    getEdditionList();
    getTypeList();
    getProductTitleList();
    getClassList();
    //handleSearch();
  }, [fresh]);

  useEffect(() => {
    handleSearch();
  }, [activePage, pageSize,fresh]);

  useEffect(() => { 
    const delayDebounceFn = setTimeout(() => {      
      handleSearch();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [ searchCol]);

  
  useEffect(() => {
    getTotal();
  }, [products]);


  return (
    <>
      <Card>
      <CardHeader>
            <Row>
              <Col>
                <h2 className="primary">Physical Stock</h2>
              </Col>
            </Row>
          </CardHeader>
          <CardHeader>
          <Row style={{ width: "100%" }}>
            <Col>
              <h5>Total Record(s) {totalNo}</h5>
            </Col>
            <Col>
              <h5>
                Record(s) Per Page
                <select
                  name="per-page"
                  onChange={changePageSize}
                  className="badge badge-glow dark btn btn-sm"
                  style={{
                    marginLeft: 7,
                    fontWeight: 700,
                    border: "1px solid",
                  }}
                  value={pageSize}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={250}>250</option>
                </select>
              </h5>
            </Col>
            <Col>
              <h5>
                Current Page {activePage} of {Math.ceil(totalNo / pageSize)}
              </h5>
            </Col>

            <Col>
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={parseInt(pageSize)}
                totalItemsCount={parseInt(totalNo)}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
              />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
        <Row className="mt-2">
            <Col sm="6" xm="6" md="2" lg="2">
              <h5>{BASE.mNF_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                value={publisher}
                options={publisherList}
                className="select-manufaturer-content"
                classNamePrefix="select"
                onChange={onChangePublisher}
              />
            </Col>
            <Col sm="6" xm="6" md="2" lg="2">
              <h5>{BASE.cT_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                value={classes}
                options={classList}
                className="select-category-content"
                classNamePrefix="select"
                onChange={onChangeClass}
              />
            </Col>
            <Col sm="6" xm="6" md="2" lg="2">
              <h5>{BASE.bR_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                value={type}
                options={typeList}
                className="select-brand-content"
                classNamePrefix="select"
                onChange={onChangeType}
              />
            </Col>
            <Col sm="6" xm="6" md="2" lg="2">
              <h5>{BASE.gEN_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                value={productTitle}
                options={productTitleList}
                className="select-title-content"
                classNamePrefix="select"
                onChange={onChangeProductTitle}
              />
            </Col>
            <Col sm="6" xm="6" md="2" lg="2">
              <h5>{BASE.sKU_Cod}</h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                value={edition}
                options={editionList}
                className="select-sku-content"
                classNamePrefix="select"
                onChange={onChangeEdtion}
              />
            </Col>
            <Col sm="6" xm="6" md="2" lg="2" style={{paddingLeft:"0px", paddingRight:"0px"}}>
              <h5 style={{ color: "#fff" }}>'</h5>
              <Button.Ripple
                style={{paddingLeft:"10px", paddingRight:"10px"}}
                color="primary"
                type="submit"
                className="mr-1 mb-1"
                onClick={handleSearch}
              >
                Search
              </Button.Ripple>
              <Button.Ripple 
                style ={{position:"right" ,paddingLeft:"15px", paddingRight:"15px"}}
                color="warning"
                type="submit"
                className="mr-1 mb-1"
                onClick={handleClear}
              >
               Clear
              </Button.Ripple>
            </Col>
          </Row>
          <Row>
           <Col xm={4} md={2} lg={2}>
              <FormGroup>
               <Label>Search</Label>
               <Input
                type="text"
                autoComplete ="off"
                name="Test"
                placeholder="Enter Text"
                value={searchCol}
                onChange={handleSearchAble}
               />
              </FormGroup> 
            </Col>
          </Row>
          <Row className="mt-2">
          <Table responsive  striped bordered>
            <thead >
              <tr>
                <th className="text-center">SL</th>
                <th>{BASE.mNF_Nm}</th>
                <th>{BASE.cT_Nm}</th>
                <th>{BASE.bR_Nm}</th>
                <th>{BASE.gEN_Nm} </th>
                <th className="text-center">{BASE.sKU_Cod}</th>  
                <th className="text-center">Current Stock</th> 
                <th className="text-center">Purchase Unit</th>   
                <th className="text-center">Purchase Rate</th> 
                <th className="text-center">Purchase Value</th>                       

              </tr>
            </thead>
            <tbody  >
              {products.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{item.sl}</td>
                  <td>{item.mNF_Nm}</td>
                  <td>{item.cT_Nm}</td>
                  <td>{item.bR_Nm}</td>
                  <td>{item.gEN_Nm}</td>
                  <td className="text-center">{item.sKU_Cod}</td>
                  <td className="text-center">{item.cUR_Stok}</td>
                  <td className="text-center">{item.uN_Nm}</td>
                  <td className="text-center">{(item.lstPurRate).toFixed(2)}</td>
                  <td className="text-center">{(item.lstPurRate * item.cUR_Stok).toFixed(2)}</td>

                </tr>
              ))}
               <tr style={{backgroundColor: "#F3EBDC" } }>
                 <td></td>
                  <td colSpan="5" className="text-left"> Total</td>
                  <td className="text-center">{(totalCurrentStock)}</td>
                  <td></td>
                  <td className="text-center">{(unitRate).toFixed(2)} </td>
                  <td className="text-center">{(totalPurchaseValue).toFixed(2)}</td>
               </tr>
            </tbody>
          </Table>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};


export default PhysicalStockGrid;

