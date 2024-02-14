import React from 'react';
import styles from './metrology.css';
import { useOtData } from '../../hooks/useOtData';

export function Metrology() {
  const [data, isLoading, error] = useOtData();

  if (isLoading) {
    return <p>isLoading...</p>;
  }

  return (
    <>
      <h2>Metrology</h2>
      <table>
        <tbody>
          {data.map((ot) => (
            <tr>
              <td>{ot.gr}</td>
              <td>{ot.naimAiis1}</td>
              <td>{ot.naimAiis2}</td>
              <td>{ot.sdSop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
