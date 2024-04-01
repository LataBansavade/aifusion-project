import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { pdfjs } from 'react-pdf';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Pdf() {
    const [file, setFile] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null); 
  const [pdfContent, setPdfContent] = useState('');
  const [question, setQuestion] = useState(''); 
  const [aiSolution, setAiSolution] = useState(''); 

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPdfContent = async () => {
      if (selectedPdf) {
        try {
          const pdf = await pdfjs.getDocument(selectedPdf).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const text = textContent.items.map(item => item.str).join('\n');
            fullText += text + '\n'; // Append text of each page
          }
          setPdfContent(fullText);
        } catch (error) {
          console.error('Error loading PDF content:', error);
        }
      }
    };

    fetchPdfContent();
  }, [selectedPdf]);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.type !== 'application/pdf') {
      alert('Please upload only PDF files.');
      return;
    }
    setSelectedPdf(URL.createObjectURL(selectedFile));
    setFile(selectedFile);
    setShowButtons(true);
  };

  const handleEnterSend = async (e) => {
    if (e.key === 'Enter') {
      setApiLoader(true)
      console.log('you press enter');
      try {
        const res = await axios.post(`https://aifusion-project-2.onrender.com/aiPdfDoubt`, { pdfContent, question })
        console.log(res.data.ansToDoubt.content)
       
        setAiSolution(res.data.ansToDoubt.content)
        setApiLoader(false)
       

      } catch (error) {
        // alert(error)
        console.log(error);
        
      }
    }
  };

  return (
    <div className='pdfPage'>
       <Navbar/>
      <div className='pdfUploadSection'>
        <h2
          className="upload-header"
          onClick={() => document.getElementById('fileInput').click()}
        >
          {showButtons ? `${file.name} ` : <div> Upload Your PDF </div>}
        </h2>
      </div>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} />
      
      <div className='mainSection'>
        <div className='leftSectionDev'>
          {selectedPdf && (
            <iframe
              title="PDF Viewer"
              src={selectedPdf}
              width="100%"
              height="580px"
              zoom="100%"
              style={{ border: 'none' }}
            />
          )}
        </div>

        <div className='rightSectionDev'>
          {
            selectedPdf && (
              <>
                <input 
                  type='text' 
                  placeholder='Ask Your Doubt' 
                  onChange={(e)=> setQuestion(e.target.value)}
                  onKeyDown={handleEnterSend}
                />

                <div className='solutionToDoubt'>
                  {apiLoader ? (
                    <div className='loader-container'>
                      <div className="loader"></div>
                    </div>
                  ) : aiSolution ? (
                    <p className='aiSolution'>{aiSolution}</p>
                  ) : (
                    <p>Get Your Solution</p>
                  )}
                </div>
              </>
            )
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Pdf;
