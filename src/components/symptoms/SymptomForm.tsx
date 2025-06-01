import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SymptomForm() {
  const [prescription, setPrescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: data.symptoms }),
      });
      
      const result = await response.json();
      setPrescription(result.prescription);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Describe Your Symptoms</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea
            {...register('symptoms')}
            placeholder="Please describe your symptoms in detail..."
            className="min-h-[200px]"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Analyzing...' : 'Get Prescription'}
          </Button>
        </form>
        
        {prescription && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Recommended Prescription</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{prescription}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}