import React from 'react';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, title, message }) => {
    if(!isOpen)  return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
            <h3 className='text-lg font-semibold mb-2'>{title}</h3>
            <p className='text-gray-600 mb-6'>{message}</p>
            <div className='flex justify-end space-x-3'>
                <button 
                    className='px-4 py-2 bg-gray-600  rounded hover:bg-gray-800 transition-colors'
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button 
                    className='px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700 transition-colors'
                    onClick={onConfirm}
                >
                    Confirm
                </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;