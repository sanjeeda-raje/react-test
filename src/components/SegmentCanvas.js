import React, { useState } from 'react'
import { BsChevronLeft } from "react-icons/bs";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';


const SegmentCanvas = () => {
    const [segmentName ,setSegmentName] = useState("");
    const [selectedSchema, setSelectedSchema] = useState("");
    const [availableSchemas, setAvailableSchemas] = useState([
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ]);
    const [dynamicDropdowns, setDynamicDropdowns] = useState([]);

    const handleAddSchema = (e) => {
      e.preventDefault();
      if (selectedSchema) {
        setDynamicDropdowns((prevDropdowns) => [
          ...prevDropdowns,
          { id: Date.now(), selectedValue: selectedSchema, options: getUnselectedOptions() },
        ]);
        setSelectedSchema('');
        setAvailableSchemas((prevSchemas) =>
        prevSchemas.filter((schema) => schema.value !== selectedSchema)
      );
      }
    };
  
    const handleDropdownChange = (id, value) => {
      setDynamicDropdowns((prevDropdowns) =>
        prevDropdowns.map((dropdown) =>
          dropdown.id === id ? { ...dropdown, selectedValue: value } : dropdown
        )
      );
    };
  
    const getUnselectedOptions = () => {
      return availableSchemas.filter(
        (schema) =>
          !dynamicDropdowns.some((dropdown) => dropdown.selectedValue === schema.value)
      );
    };
    const handleSaveSegment = async (e) => {
      e.preventDefault();
      
      const transformedSchema = dynamicDropdowns.map((dropdown) => ({
        [dropdown.selectedValue]: dropdown.options.find(option => option.value === dropdown.selectedValue).label,
      }));
      
      const segmentData = {
        segment_name: segmentName,
        schema: transformedSchema,
      };
    
      // Replace 'YOUR_WEBHOOK_URL' with the actual webhook URL you obtained from webhook.site
      const webhookUrl = 'https://webhook.site/c256a301-dfe1-43cf-a385-6d111542b07e';
    
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(segmentData),
        });
    
        if (response.ok) {
          toastr.success('Segment data sent successfully', '', {
            positionClass: 'toast-bottom-left',
            showProgressBar: true,
            progressBar: true,
          });
          console.log('Segment data sent successfully');
        } else {
          toastr.error('Failed to send segment data');
          console.error('Failed to send segment data');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    
      // Reset state after saving the segment
      setSegmentName('');
      setDynamicDropdowns([]);
      setAvailableSchemas([
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
      ]);
    };
    
  return (
    <div className="saving-segment">
  <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header">
      <nav className="navbar bg-blue py-3">
        <div className="container-fluid">
          <h4 className="navbar-brand  d-flex align-items-center mb-0 text-white"><BsChevronLeft className="me-3 btn-close" data-bs-dismiss="offcanvas" aria-label="Close" /> Saving Segment</h4>
        </div>
      </nav>
    </div>
    <div className="offcanvas-body">
      <form>
        <h6 className='mb-3'>Enter the Name of the Segment </h6>
        <input type='text' placeholder='Name of the segment' className='form-control mb-3' value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}/>
        <h6 className='mb-3'>To save your segment, you need to add schemas to buid the query</h6>
        <div className='bluebox mb-3'>
        {dynamicDropdowns.map((dropdown) => (
          <div key={dropdown.id}>
            <select className='form-select mb-3'
              value={dropdown.selectedValue}
              onChange={(e) => handleDropdownChange(dropdown.id, e.target.value)}
            >
              {dropdown.options.map((option) => (
                <option key={option.value} value={option.value} >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        </div>
        <select className='form-select mb-3' value={selectedSchema} onChange={(e) => setSelectedSchema(e.target.value)}>
            <option value="" hidden>Add schema to the segment</option>
            {
                availableSchemas.map( (schema) => (
                   <option key={schema.value}  value={schema.value}> {schema.label}</option>
                ))
            }
        </select>
        <button className='btn-2' onClick={handleAddSchema}>+Add new schema</button>
        
      </form>
    </div>
    <div className='offcanvas-footer'>
    <button className='btn-1 m-3' onClick={handleSaveSegment}>Save the segment</button>
    </div>
  </div>
</div>

  )
}

export default SegmentCanvas
