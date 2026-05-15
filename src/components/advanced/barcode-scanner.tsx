"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, CameraOff, Scan, X, Loader2 } from "lucide-react";

interface BarcodeScannerProps {
  className?: string;
  onScan?: (result: string) => void;
  onError?: (error: string) => void;
}

export function BarcodeScanner({ className, onScan, onError }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const scanInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopCamera = useCallback(() => {
    if (scanInterval.current) {
      clearInterval(scanInterval.current);
      scanInterval.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setActive(false);
    setScanning(false);
  }, []);

  const startCamera = async () => {
    setError(null);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setActive(true);
      startScanLoop();
    } catch (err) {
      const msg = err instanceof DOMException && err.name === "NotAllowedError"
        ? "Camera permission denied. Allow camera access and try again."
        : "Camera not available. Ensure you're on HTTPS or localhost.";
      setError(msg);
      onError?.(msg);
    }
  };

  const startScanLoop = () => {
    setScanning(true);
    scanInterval.current = setInterval(async () => {
      if (!("BarcodeDetector" in window)) {
        stopCamera();
        const fallbackMsg = "BarcodeDetector not supported in this browser. Try Chrome on desktop or Android.";
        setError(fallbackMsg);
        onError?.(fallbackMsg);
        return;
      }

      const detector = new (window as unknown as { BarcodeDetector: new (opts?: { formats: string[] }) => { detect: (el: HTMLVideoElement) => Promise<{ rawValue: string }[]> } }).BarcodeDetector({
        formats: ["qr_code", "code_128", "code_39", "ean_13", "ean_8", "upc_a", "upc_e", "pdf417", "aztec", "data_matrix"],
      });

      if (!videoRef.current) return;

      try {
        const barcodes = await detector.detect(videoRef.current);
        if (barcodes.length > 0) {
          const value = barcodes[0].rawValue;
          setResult(value);
          onScan?.(value);
          stopCamera();
        }
      } catch {
      }
    }, 500);
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative overflow-hidden rounded-lg border bg-black/5">
        {!active ? (
          <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
            {error ? (
              <>
                <X className="h-8 w-8 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
                <Button size="sm" variant="outline" onClick={reset} className="mt-1">
                  Try Again
                </Button>
              </>
            ) : (
              <>
                <Scan className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Scan a barcode or QR code</p>
                <Button size="sm" onClick={startCamera} className="gap-1.5 mt-1">
                  <Camera className="h-4 w-4" /> Start Camera
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="relative">
            <video ref={videoRef} className="w-full" playsInline muted />
            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-48 rounded-lg border-2 border-primary/50" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Button variant="secondary" size="icon-xs" onClick={stopCamera} title="Stop camera">
                <CameraOff className="h-3.5 w-3.5" />
              </Button>
            </div>
            {scanning && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Scanning...
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {result && (
        <div className="rounded-lg border bg-muted/30 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Scan className="h-4 w-4 shrink-0 text-success" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-success">Scanned Successfully</p>
                <p className="text-sm font-mono tabular-nums truncate">{result}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon-xs" onClick={reset} title="Clear">
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
