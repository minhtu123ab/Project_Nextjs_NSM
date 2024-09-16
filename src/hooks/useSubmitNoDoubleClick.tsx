import React, { useEffect } from "react";

const useSubmitNoDoubleClick = <T,>(onSubmit: (data: T) => Promise<void>) => {
  const [formData, setFormData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmitAddFormData = (data: T) => {
    setFormData(data);
    setLoading(true);
  };

  useEffect(() => {
    if (loading && formData) {
      onSubmit(formData);
      setLoading(false);
    }
  }, [loading, formData, onSubmit]);

  return { handleSubmitAddFormData, loading };
};

export default useSubmitNoDoubleClick;
