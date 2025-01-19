"use client";

const LocationPicker = ({ lat = "40.718625", lng = "-74.035536" }) => {
    const googleMapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden relative">
            <iframe
                src={googleMapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                width="100%"
                height="280"
            ></iframe>
        </div>
    );
};

export default LocationPicker;
